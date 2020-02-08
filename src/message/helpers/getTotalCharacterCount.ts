import { MessageWithoutIds } from "../types/MessageWithoutIds"

export const getTotalCharacterCount = (message: MessageWithoutIds) => {
  let count = message.content?.length ?? 0

  for (const embed of message.embeds ?? []) {
    count += embed.title?.length ?? 0
    count += embed.description?.length ?? 0
    count += embed.author?.name?.length ?? 0
    count += embed.footer?.text?.length ?? 0

    for (const field of embed.fields ?? []) {
      count += field.name?.length ?? 0
      count += field.value?.length ?? 0
    }
  }

  return count
}
