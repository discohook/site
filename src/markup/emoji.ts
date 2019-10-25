import { diversities, emojis } from "./emojis"

const nameToEmoji = new Map<string, string>()
const emojiToName = new Map<string, string>()

for (const { emoji, names, hasDiversity } of emojis) {
  for (const name of names) {
    nameToEmoji.set(name, emoji)

    if (!hasDiversity) continue

    for (const [id, diversity] of Object.entries(diversities)) {
      const nameWithDiversity = `${name}::skin-tone-${Number(id) + 1}`
      nameToEmoji.set(nameWithDiversity, `${emoji}${diversity}`)
    }
  }

  emojiToName.set(emoji, names[0])

  if (!hasDiversity) continue

  for (const [id, diversity] of Object.entries(diversities)) {
    const name = `${names[0]}::skin-tone-${Number(id) + 1}`
    emojiToName.set(`${emoji}${diversity}`, name)
  }
}

export { nameToEmoji, emojiToName }

export const getEmojiUrl = (emoji: string) => {
  if (["™", "©", "®"].includes(emoji)) return

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const file = [...emoji].map(c => c.codePointAt(0)!.toString(16)).join("-")
  return `https://jaylineko.github.io/discord-emoji/${file}.svg`
}
