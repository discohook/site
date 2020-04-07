import { observable } from "mobx"
import { decodeMessage } from "../../core/helpers/decodeMessage"
import { InitializableStore } from "../../state/classes/InitializableStore"
import type { Stores } from "../../state/types/Stores"
import type { Message } from "../classes/Message"
import { INITIAL_MESSAGE_DATA } from "../constants"
import { getMessageFromData } from "../helpers/getMessageFromData"

export class MessageStore extends InitializableStore<Stores> {
  @observable message!: Message

  async initialize() {
    const { ssrStore } = this.manager.stores
    await ssrStore.initialized

    const search = ssrStore.context ? ssrStore.context.search : location.search
    const parameters = new URLSearchParams(search)
    const encodedBackup = parameters.get("message") ?? parameters.get("backup")

    const messageData = decodeMessage(encodedBackup ?? "")
    if (!SERVER && messageData) console.log("Loaded with message:", messageData)

    this.message = getMessageFromData(messageData ?? INITIAL_MESSAGE_DATA)
  }
}
