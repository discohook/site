import { isValid } from "date-fns"
import { observable } from "mobx"
import { MessageData } from "../types/MessageData"
import { Embed } from "./Embed"

export class Message {
  @observable content = ""
  @observable embeds: Embed[] = []
  @observable username = ""
  @observable avatar = ""
  @observable files: File[] = []

  constructor(message: MessageData = {}) {
    this.content = message.content ?? ""
    this.embeds = message.embeds?.map(embed => new Embed(this, embed)) ?? []
    this.username = message.username ?? ""
    this.avatar = message.avatarUrl ?? ""
    this.files = Array.from(message.files ?? [])
  }

  getMessageData(): MessageData {
    return {
      content: this.content || undefined,
      embeds:
        this.embeds.length > 0
          ? this.embeds.map(embed => ({
              title: embed.title || undefined,
              description: embed.description || undefined,
              url: embed.url || undefined,
              color: embed.color.raw ?? undefined,
              fields:
                embed.fields.length > 0
                  ? embed.fields.map(field => ({
                      name: field.name || undefined,
                      value: field.value || undefined,
                      inline: field.inline || undefined,
                    }))
                  : undefined,
              author: embed.author
                ? {
                    name: embed.author,
                    url: embed.authorUrl,
                    iconUrl: embed.authorIcon,
                  }
                : undefined,
              footer: embed.footer
                ? {
                    text: embed.footer,
                    iconUrl: embed.footerIcon,
                  }
                : undefined,
              timestamp: isValid(embed.timestamp)
                ? embed.timestamp.toJSON()
                : undefined,
              image: embed.image ? { url: embed.image } : undefined,
              thumbnail: embed.thumbnail ? { url: embed.thumbnail } : undefined,
            }))
          : undefined,
      username: this.username || undefined,
      avatarUrl: this.avatar || undefined,
      files: this.files.length > 0 ? Array.from(this.files) : undefined,
    }
  }
}
