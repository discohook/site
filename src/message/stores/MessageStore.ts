import { observable } from "mobx"
import { decodeMessage } from "../../core/helpers/decodeMessage"
import { InitialisableStore } from "../../state/classes/InitialisableStore"
import { Message } from "../classes/Message"
import { INITIAL_MESSAGE_DATA } from "../constants"

export class MessageStore extends InitialisableStore {
  @observable message!: Message

  initialise() {
    if (SERVER) return

    const parameters = new URLSearchParams(location.search)
    const encodedBackup = parameters.get("message") ?? parameters.get("backup")

    const messageData = decodeMessage(encodedBackup ?? "")
    if (messageData) console.log("Loaded with message:", messageData)

    this.message = new Message(messageData ?? INITIAL_MESSAGE_DATA)
  }
}
