import { emojiData, toneNames, toneNumbers } from "./emojiData"

export const nameToEmoji = new Map<string, string>()
export const emojiToName = new Map<string, string>()

for (const { emoji, flags, aliases } of emojiData) {
  for (const alias of aliases) {
    if (!alias.flags?.includes("*")) {
      nameToEmoji.set(alias.name, emoji)
    }

    if (flags?.includes("+")) {
      for (const [id, diversity] of Object.entries(toneNumbers)) {
        nameToEmoji.set(`${alias.name}::skin-tone-${id}`, emoji + diversity)
      }
    }

    if (alias.flags?.includes("#")) {
      for (const [id, diversity] of Object.entries(toneNumbers)) {
        nameToEmoji.set(`${alias.name}_tone${id}`, emoji + diversity)
      }
    }

    if (alias.flags?.includes("!")) {
      for (const [id, diversity] of Object.entries(toneNames)) {
        nameToEmoji.set(`${alias.name}_${id}`, emoji + diversity)
      }
    }
  }

  emojiToName.set(emoji, aliases[0].name)

  if (flags?.includes("+")) {
    for (const [id, diversity] of Object.entries(toneNumbers)) {
      emojiToName.set(emoji + diversity, `${aliases[0].name}_tone${id}`)
    }
  }
}

export const getEmojiUrl = (emoji: string) => {
  const file = [...emoji]
    .map(char => char.codePointAt(0)?.toString(16))
    .join("-")

  return `https://twitter.github.io/twemoji/v/12.1.3/svg/${file}.svg`
}
