import { EMOJI_CDN_BASE_URL } from "../constants/constants"

export const getEmojiUrl = (emoji: string) => {
  const file = [...emoji]
    .map(character => character.codePointAt(0)?.toString(16))
    // Twemoji does not include '\uFE0F' (VARIATION SELECTOR) in their file names
    .filter(codePoint => codePoint !== "fe0f")
    .join("-")

  return `${EMOJI_CDN_BASE_URL}/${file}.svg`
}
