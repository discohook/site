import { observable } from "mobx"
import type { MessageData } from "../message/data/MessageData"
import { Message } from "../message/Message"
import { Webhook } from "./webhook/Webhook"

export class EditorManager {
  @observable message: Message
  @observable webhook = new Webhook()

  constructor(message: MessageData) {
    this.message = Message.of(message)
  }
}
