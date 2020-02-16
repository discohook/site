import { action, observable } from "mobx"
import { MessageData } from "../types/MessageData"
import { Embed } from "./Embed"

export class Message {
  @observable content?: string
  @observable embeds = observable.array<Embed>()
  @observable username?: string
  @observable avatar?: string
  @observable files = observable.array<File>()

  constructor(message: MessageData = {}) {
    this.apply(message)
  }

  @action apply(message: MessageData) {
    this.content = message.content
    this.embeds.clear()
    this.embeds.push(
      ...(message.embeds?.map(embed => new Embed(this, embed)) ?? []),
    )
    this.username = message.username
    this.avatar = message.avatarUrl
    this.files.clear()
    this.files.push(...(message.files ?? []))
  }

  toJS(): MessageData {
    return {
      content: this.content,
      embeds:
        this.embeds.length > 0
          ? this.embeds.map(embed => embed.toJS())
          : undefined,
      username: this.username,
      avatarUrl: this.avatar,
      files: this.files.length > 0 ? this.files.toJS() : undefined,
    }
  }
}
