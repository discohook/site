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

  @observable title = ""
  @observable description = ""
  @observable url = ""
  @observable color = new Color(null)
  @observable fields: Field[] = []
  @observable author = ""
  @observable authorUrl = ""
  @observable authorIcon = ""
  @observable footer = ""
  @observable footerIcon = ""
  @observable timestamp = new Date(NaN)
  @observable image = ""
  @observable thumbnail = ""

  constructor(message: Message, embed: EmbedData = {}) {
    this.message = message
    this.apply(embed)
  }

  @action apply(embed: EmbedData) {
    this.title = embed.title ?? ""
    this.description = embed.description ?? ""
    this.url = embed.url ?? ""
    this.color = new Color(embed.color ?? null)
    this.fields = embed.fields?.map(field => new Field(this, field)) ?? []
    this.author = embed.author?.name ?? ""
    this.authorUrl = embed.author?.url ?? ""
    this.authorIcon = embed.author?.iconUrl ?? ""
    this.footer = embed.footer?.text ?? ""
    this.footerIcon = embed.footer?.iconUrl ?? ""
    this.timestamp = new Date(embed.timestamp ?? NaN)
    this.image = embed.image?.url ?? ""
    this.thumbnail = embed.thumbnail?.url ?? ""
  }

  // eslint-disable-next-line @typescript-eslint/unbound-method
  @computed.struct get gallery() {
    return getEmbedGallery(this)
  }

  toJS(): EmbedData {
    return {
      title: this.title || undefined,
      description: this.description || undefined,
      url: this.url || undefined,
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
