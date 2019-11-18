import { Draft, produce } from "immer"
import { Message, MessageWithoutIds } from "./Message"
import { getUniqueId, id } from "./uid"

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
