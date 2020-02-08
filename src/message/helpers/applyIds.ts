import { Draft, produce } from "immer"
import { Message } from "../types/Message"
import { MessageWithoutIds } from "../types/MessageWithoutIds"
import { getUniqueId, id } from "./getUniqueId"

export const applyIds = produce<(message: MessageWithoutIds) => Message>(
  (message: Draft<Message>) => {
    for (const embed of message.embeds ?? []) {
      embed[id] = getUniqueId()

      for (const field of embed.fields ?? []) {
        field[id] = getUniqueId()
      }
    }

    return message
  },
)
