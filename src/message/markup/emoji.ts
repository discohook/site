import { diversities, emojis } from "./emojis"

export const nameToEmoji: Record<string, string> = {}
export const emojiToName: Record<string, string> = {}

for (const emoji of emojis) {
  emojiToName[emoji.surrogates] = emoji.names[0]

  for (const name of emoji.names) {
    nameToEmoji[name] = emoji.surrogates

    if (emoji.hasDiversity)
      for (const [index, diversity] of Object.entries(diversities)) {
        const surrogates = `${emoji.surrogates}${diversity}`
        nameToEmoji[`${name}::skin-tone-${index + 1}`] = surrogates
      }
  }

  if (emoji.hasDiversity)
    for (const [index, diversity] of Object.entries(diversities)) {
      const surrogates = `${emoji.surrogates}${diversity}`
      emojiToName[surrogates] = `${emoji.names[0]}::skin-tone-${index + 1}`
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

  return `https://twemoji.maxcdn.com/2/svg/${result.join("-")}.svg`
}
