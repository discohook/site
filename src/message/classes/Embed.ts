import { isValid } from "date-fns"
import { computed, observable } from "mobx"
import { Color } from "../../color/classes/Color"
import { getUniqueId } from "../helpers/getUniqueId"
import type { AuthorData } from "../types/AuthorData"
import type { EmbedData } from "../types/EmbedData"
import type { FieldData } from "../types/FieldData"
import type { FooterData } from "../types/FooterData"
import { Field } from "./Field"
import type { Message } from "./Message"

export class Embed {
  readonly id = getUniqueId()

  readonly message: Message

  @observable title = ""
  @observable description = ""
  @observable url = ""
  @observable color = new Color()
  @observable fields: Field[] = []
  @observable author = ""
  @observable authorUrl = ""
  @observable authorIcon = ""
  @observable footer = ""
  @observable footerIcon = ""
  @observable timestamp = new Date(Number.NaN)
  @observable gallery: string[] = []
  @observable thumbnail = ""

  constructor(message: Message, embed?: Embed) {
    this.message = message

    if (embed) {
      this.title = embed.title
      this.description = embed.description
      this.url = embed.url
      this.color.raw = embed.color.raw
      this.fields = embed.fields.map(field => new Field(embed, field))
      this.author = embed.author
      this.authorUrl = embed.authorUrl
      this.authorIcon = embed.authorIcon
      this.footer = embed.footer
      this.footerIcon = embed.footerIcon
      this.timestamp = new Date(embed.timestamp)
      this.gallery = [...embed.gallery]
      this.thumbnail = embed.thumbnail
    }
  }

  @computed get weight() {
    return this.gallery.length || 1
  }

  @computed get hasTitle() {
    return this.title.trim().length > 0
  }

  @computed get hasDescription() {
    return this.description.trim().length > 0
  }

  @computed get hasAuthor() {
    return this.author.trim().length > 0
  }

  @computed get hasFooter() {
    return this.footer.trim().length > 0 || isValid(this.timestamp)
  }

  getEmbedsData() {
    const fields: FieldData[] | undefined =
      this.fields.length > 0
        ? this.fields.map(field => ({
            name: field.name || undefined,
            value: field.value || undefined,
            inline: field.inline || undefined,
          }))
        : undefined

    const author: AuthorData | undefined = this.author
      ? {
          name: this.author,
          url: this.authorUrl || undefined,
          icon_url: this.authorIcon || undefined,
        }
      : undefined

    const footer: FooterData | undefined = this.footer
      ? {
          text: this.footer,
          icon_url: this.footerIcon || undefined,
        }
      : undefined

    const embeds: EmbedData[] = [
      {
        title: this.title || undefined,
        description: this.description || undefined,
        url: this.url || undefined,
        color: this.color.raw ?? undefined,
        fields,
        author,
        footer,
        timestamp: isValid(this.timestamp)
          ? this.timestamp.toJSON()
          : undefined,
        image: this.gallery.length > 0 ? { url: this.gallery[0] } : undefined,
        thumbnail: this.thumbnail ? { url: this.thumbnail } : undefined,
      },
    ]

    for (const image of this.gallery.slice(1)) {
      embeds.push({
        url: this.url,
        image: { url: image },
      })
    }

    return embeds as readonly EmbedData[]
  }
}
