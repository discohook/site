import { isValid } from "date-fns"
import { action, computed, observable } from "mobx"
import { Color } from "../../color/classes/Color"
import { getEmbedGallery } from "../helpers/getEmbedGallery"
import { getUniqueId } from "../helpers/getUniqueId"
import { EmbedData } from "../types/EmbedData"
import { Field } from "./Field"

type Message = import("./Message").Message

export class Embed {
  readonly id = getUniqueId()

  readonly message: Message

  @observable title?: string
  @observable description?: string
  @observable url?: string
  @observable color = new Color(null)
  @observable fields: Field[] = []
  @observable author?: string
  @observable authorUrl?: string
  @observable authorIcon?: string
  @observable footer?: string
  @observable footerIcon?: string
  @observable timestamp: Date = new Date(NaN)
  @observable image?: string
  @observable thumbnail?: string

  constructor(message: Message, embed: EmbedData = {}) {
    this.message = message
    this.apply(embed)
  }

  @action apply(embed: EmbedData) {
    this.title = embed.title
    this.description = embed.description
    this.url = embed.url
    this.color = new Color(embed.color ?? null)
    this.fields = embed.fields?.map(field => new Field(this, field)) ?? []
    this.author = embed.author?.name
    this.authorUrl = embed.author?.url
    this.authorIcon = embed.author?.iconUrl
    this.footer = embed.footer?.text
    this.footerIcon = embed.footer?.iconUrl
    this.timestamp = new Date(embed.timestamp ?? NaN)
    this.image = embed.image?.url
    this.thumbnail = embed.thumbnail?.url
  }

  @computed get gallery() {
    return getEmbedGallery(this)
  }

  toJS(): EmbedData {
    return {
      title: this.title,
      description: this.description,
      url: this.url,
      color: this.color.toJS() ?? undefined,
      fields:
        this.fields.length > 0
          ? this.fields.map(field => field.toJS())
          : undefined,
      author: this.author
        ? {
            name: this.author,
            url: this.authorUrl,
            iconUrl: this.authorIcon,
          }
        : undefined,
      footer: this.footer
        ? {
            text: this.footer,
            iconUrl: this.footerIcon,
          }
        : undefined,
      timestamp: isValid(this.timestamp) ? this.timestamp.toJSON() : undefined,
      image: this.image ? { url: this.image } : undefined,
      thumbnail: this.thumbnail ? { url: this.thumbnail } : undefined,
    }
  }
}
