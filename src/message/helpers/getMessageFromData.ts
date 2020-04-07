import { Embed } from "../classes/Embed"
import { Field } from "../classes/Field"
import { Message } from "../classes/Message"
import type { MessageData } from "../types/MessageData"

export const getMessageFromData = (messageData: MessageData) => {
  const message = new Message()

  message.content = messageData.content ?? ""
  message.username = messageData.username ?? ""
  message.avatar = messageData.avatarUrl ?? ""

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

    embed = new Embed(message)
    message.embeds.push(embed)

    if (embedData.title) embed.title = embedData.title
    if (embedData.description) embed.description = embedData.description
    if (embedData.url) embed.url = embedData.url
    if (typeof embedData.color === "number") embed.color.raw = embedData.color
    if (embedData.author?.name) embed.author = embedData.author.name
    if (embedData.author?.url) embed.authorUrl = embedData.author.url
    if (embedData.author?.iconUrl) embed.authorIcon = embedData.author.iconUrl
    if (embedData.footer?.text) embed.footer = embedData.footer.text
    if (embedData.footer?.iconUrl) embed.footerIcon = embedData.footer.iconUrl
    embed.timestamp = new Date(embedData.timestamp ?? Number.NaN)
    if (embedData.image?.url) embed.gallery.push(embedData.image.url)
    if (embedData.thumbnail?.url) embed.thumbnail = embedData.thumbnail.url

    for (const fieldData of embedData?.fields ?? []) {
      const field = new Field(embed)
      embed.fields.push(field)

      if (fieldData.name) field.name = fieldData.name
      if (fieldData.value) field.value = fieldData.value
      if (fieldData.inline) field.inline = fieldData.inline
    }
  }

  return message
}
