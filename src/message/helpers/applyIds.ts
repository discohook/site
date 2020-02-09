import { Draft, produce } from "immer"
import { ID } from "../constants/id"
import { Message } from "../types/Message"
import { MessageWithoutIds } from "../types/MessageWithoutIds"
import { getUniqueId } from "./getUniqueId"

export const applyIds = produce<(message: MessageWithoutIds) => Message>(
  (message: Draft<Message>) => {
    for (const embed of message.embeds ?? []) {
      embed[ID] = getUniqueId()

      for (const field of embed.fields ?? []) {
        field[ID] = getUniqueId()
      }
    }

    return message
  },
)
