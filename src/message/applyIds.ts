import { Message, MessageWithoutIds } from "./Message"
import { getUniqueId, id } from "./uid"

export const applyIds = (message: MessageWithoutIds): Message => {
  const newMessage = { ...message } as Message

  if (!Array.isArray(newMessage.embeds)) return newMessage
  newMessage.embeds = [...newMessage.embeds]

  for (const index of newMessage.embeds.keys()) {
    const newEmbed = {
      ...newMessage.embeds[index],
      [id]: getUniqueId(),
    }

    newMessage.embeds[index] = newEmbed

    if (!Array.isArray(newEmbed.fields)) continue
    newEmbed.fields = [...newEmbed.fields]

    for (const index of newEmbed.fields.keys()) {
      const newField = {
        ...newEmbed.fields[index],
        [id]: getUniqueId(),
      }

      newEmbed.fields[index] = newField
    }
  }

  return newMessage
}
