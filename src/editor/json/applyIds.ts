import { Message } from "../../message/Message"
import { getUniqueId, id } from "../../uid"

export const applyIds = (message: Message) => {
  const newMessage = { ...message }

  if (!Array.isArray(newMessage.embeds)) return newMessage

  for (const index of newMessage.embeds.keys()) {
    const embed = {
      ...newMessage.embeds[index],
      [id]: getUniqueId(),
    }

    newMessage.embeds[index] = embed

    if (!Array.isArray(embed.fields)) continue

    for (const index of embed.fields.keys()) {
      const field = {
        ...embed.fields[index],
        [id]: getUniqueId(),
      }

      embed.fields[index] = field
    }
  }

  return newMessage
}
