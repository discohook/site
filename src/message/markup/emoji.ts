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

export const getEmojiUrl = (surrogate: string) => {
  if (["™", "©", "®"].includes(surrogate)) return

  const result: string[] = []
  let p = 0
  for (let i = 0; i < surrogate.length; i++) {
    const char = surrogate.charCodeAt(i)
    if (p) {
      result.push(
        (0x10000 + ((p - 0xd800) << 10) + (char - 0xdc00)).toString(16),
      )
      p = 0
    } else if (0xd800 <= char && char <= 0xdbff) {
      p = char
    } else {
      result.push(char.toString(16))
    }
  }

  return `https://jaylineko.com/twemoji/${result.join("-")}.svg`
}
