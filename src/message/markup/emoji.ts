import { diversities, emojis } from "./emojis"

export const nameToEmoji: Record<string, string> = {}
export const emojiToName: Record<string, string> = {}

for (const { emoji, names, hasDiversity } of emojis) {
  emojiToName[emoji] = names[0]

  for (const name of names) {
    nameToEmoji[name] = emoji

    if (hasDiversity)
      for (const [id, diversity] of Object.entries(diversities)) {
        const nameWithDiversity = `${name}::skin-tone-${Number(id) + 1}`
        nameToEmoji[nameWithDiversity] = `${emoji}${diversity}`
      }
  }

  if (hasDiversity)
    for (const [id, diversity] of Object.entries(diversities)) {
      const name = `${names[0]}::skin-tone-${Number(id) + 1}`
      emojiToName[`${emoji}${diversity}`] = name
    }
}

export const getEmojiUrl = (emoji: string) => {
  if (["™", "©", "®"].includes(emoji)) return

  const file = [...emoji].map(c => c.codePointAt(0)!.toString(16)).join("-")
  return `https://jaylineko.github.io/discord-emoji/${file}.svg`
}
