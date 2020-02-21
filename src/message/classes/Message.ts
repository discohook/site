import { action, observable } from "mobx"
import { MessageData } from "../types/MessageData"
import { Embed } from "./Embed"

export class Message {
  @observable content = ""
  @observable embeds: Embed[] = []
  @observable username = ""
  @observable avatar = ""
  @observable files: File[] = []

  constructor(message: MessageData = {}) {
    this.apply(message)
  }

  @action apply(message: MessageData) {
    this.content = message.content ?? ""
    this.embeds = message.embeds?.map(embed => new Embed(this, embed)) ?? []
    this.username = message.username ?? ""
    this.avatar = message.avatarUrl ?? ""
    this.files = Array.from(message.files ?? [])
  }

  toJS(): MessageData {
    return {
      content: this.content || undefined,
      embeds:
        this.embeds.length > 0
          ? this.embeds.map(embed => embed.toJS())
          : undefined,
      username: this.username || undefined,
      avatarUrl: this.avatar || undefined,
      files: this.files.length > 0 ? Array.from(this.files) : undefined,
    }
  }
}
