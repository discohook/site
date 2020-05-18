import { computed, observable } from "mobx"
import { getUniqueId } from "../../common/uid"
import type { MessageData } from "./data/MessageData"
import { Embed } from "./Embed"
import { Field } from "./Field"

export class Message {
  readonly id: number

  @observable content = ""
  @observable embeds: Embed[] = []
  @observable username = ""
  @observable avatar = ""
  @observable files: File[] = []

  constructor(message?: Message, id = getUniqueId()) {
    this.id = id

    if (message) {
      this.content = message.content
      this.embeds = message.embeds.map(embed => new Embed(this, embed))
      this.username = message.username
      this.avatar = message.avatar
      this.files = [...message.files]
    }
  }

  @computed get hasContent() {
    return this.content.trim().length > 0
  }

  @computed get hasExtras() {
    return this.embeds.length > 0 || this.files.length > 0
  }

  @computed get embedLimit() {
    let limit = 10
    for (const embed of this.embeds) limit -= embed.weight - 1
    return limit
  }

  getMessageData(): MessageData {
    const embeds = this.embeds.flatMap(embed => embed.getEmbedsData())

    return {
      content: this.content || undefined,
      embeds: embeds.length > 0 ? embeds : undefined,
      username: this.username || undefined,
      avatar_url: this.avatar || undefined,
      files: this.files.length > 0 ? Array.from(this.files) : undefined,
    }
  }

  static of(messageData: MessageData) {
    const message = new Message(undefined, messageData.id)

    message.content = messageData.content ?? ""
    message.username = messageData.username ?? ""
    message.avatar = messageData.avatar_url ?? ""

    for (const embedData of messageData.embeds ?? []) {
      let embed =
        message.embeds.length > 0
          ? message.embeds[message.embeds.length - 1]
          : undefined

      if (embed?.url && embed.url === embedData.url) {
        if (embedData.image?.url && embed.gallery.length < 4) {
          embed.gallery.push(embedData.image.url)
        }

        continue
      }

      embed = new Embed(message, undefined, embedData.id)

      message.embeds.push(embed)

      if (embedData.title) embed.title = embedData.title
      if (embedData.description) embed.description = embedData.description
      if (embedData.url) embed.url = embedData.url
      if (typeof embedData.color === "number") embed.color.raw = embedData.color
      if (embedData.author?.name) embed.author = embedData.author.name
      if (embedData.author?.url) embed.authorUrl = embedData.author.url
      if (embedData.author?.icon_url)
        embed.authorIcon = embedData.author.icon_url
      if (embedData.footer?.text) embed.footer = embedData.footer.text
      if (embedData.footer?.icon_url)
        embed.footerIcon = embedData.footer.icon_url
      embed.timestamp = new Date(embedData.timestamp ?? Number.NaN)
      if (embedData.image?.url) embed.gallery.push(embedData.image.url)
      if (embedData.thumbnail?.url) embed.thumbnail = embedData.thumbnail.url

      for (const fieldData of embedData.fields ?? []) {
        const field = new Field(embed, undefined, fieldData.id)
        embed.fields.push(field)

        if (fieldData.name) field.name = fieldData.name
        if (fieldData.value) field.value = fieldData.value
        if (fieldData.inline) field.inline = fieldData.inline
      }
    }

    return message
  }
}
