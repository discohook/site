import { diversities, emojis } from "./emojis"

export const nameToEmoji: Record<string, string> = {}
export const emojiToName: Record<string, string> = {}

for (const emoji of emojis) {
  emojiToName[emoji.surrogates] = emoji.names[0]

  for (const name of emoji.names) {
    nameToEmoji[name] = emoji.surrogates

    if (emoji.hasDiversity)
      for (const [index, diversity] of Object.entries(diversities)) {
        const nameWithDiversity = `${name}::skin-tone-${Number(index) + 1}`
        const surrogates = `${emoji.surrogates}${diversity}`
        nameToEmoji[nameWithDiversity] = surrogates
      }
  }

  if (emoji.hasDiversity)
    for (const [index, diversity] of Object.entries(diversities)) {
      const name = `${emoji.names[0]}::skin-tone-${Number(index) + 1}`
      const surrogates = `${emoji.surrogates}${diversity}`
      emojiToName[surrogates] = name
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
