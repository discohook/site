import { isValid } from "date-fns"
import { computed, observable } from "mobx"
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

  @computed get shouldRender() {
    if (!this.url) return true

    const embedIndex = this.message.embeds.indexOf(this)
    if (embedIndex < 1) return true

    const lastEmbed = this.message.embeds[embedIndex - 1]
    return lastEmbed.url !== this.url
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
}
