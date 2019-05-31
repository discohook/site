const {
  diversities,
  emojis,
}: {
  diversities: string[]
  emojis: Record<string, { names: string[]; hasDiversity?: boolean }>
} = require("./emojis.json")

export const nameToEmoji: Record<string, string> = {}
export const emojiToName: Record<string, string> = {}

for (const [emoji, { names, hasDiversity }] of Object.entries(emojis)) {
  emojiToName[emoji] = names[0]

  for (const name of names) {
    nameToEmoji[name] = emoji

    if (hasDiversity)
      for (const [id, tone] of Object.entries(diversities)) {
        const nameWithDiversity = `${name}::skin-tone-${Number(id) + 1}`
        nameToEmoji[nameWithDiversity] = `${emoji}${tone}`
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

  const file = [...emoji].map((c) => c.codePointAt(0)!.toString(16)).join("-")
  return `https://jaylineko.com/twemoji/${file}.svg`
}
