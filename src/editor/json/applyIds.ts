import { Message } from "../../message/Message"
import { getUniqueId, id } from "../../uid"

export const applyIds = (message: Message) => {
  const newMessage = { ...message }

  if (Array.isArray(newMessage.embeds)) {
    for (const index in newMessage.embeds) {
      const embed = {
        ...newMessage.embeds[index],
        [id]: getUniqueId(),
      }

      newMessage.embeds[index] = embed

      if (Array.isArray(embed.fields)) {
        for (const index in embed.fields) {
          embed.fields[index] = {
            ...embed.fields[index],
            [id]: getUniqueId(),
          }
        }
      }
    }
  }

  return newMessage
}
