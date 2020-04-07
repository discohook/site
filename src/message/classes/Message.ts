import { computed, observable } from "mobx"
import type { MessageData } from "../types/MessageData"
import { Embed } from "./Embed"

export class Message {
  @observable content = ""
  @observable embeds: Embed[] = []
  @observable username = ""
  @observable avatar = ""
  @observable files: File[] = []

  constructor(message?: Message) {
    if (message) {
      this.content = message.content
      this.embeds = message.embeds.map(embed => new Embed(this, embed))
      this.username = message.username
      this.avatar = message.avatar
      this.files = [...message.files]
    }
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
      avatarUrl: this.avatar || undefined,
      files: this.files.length > 0 ? Array.from(this.files) : undefined,
    }
  }
}
