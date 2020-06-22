const EMOJI_CDN_BASE_URL = "https://twemoji.maxcdn.com/v/12.1.4/svg"

export const getEmojiUrl = (emoji: string) => {
  const file = [...emoji]
    .map(character => character.codePointAt(0)?.toString(16))
    .join("-")

  return `${EMOJI_CDN_BASE_URL}/${file}.svg`
}
