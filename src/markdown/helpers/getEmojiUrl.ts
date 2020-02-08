export const getEmojiUrl = (emoji: string) => {
  const file = [...emoji]
    .map(character => character.codePointAt(0)?.toString(16))
    // Twemoji does not include '\uFE0F' (VARIATION SELECTOR) in their file names
    .filter(codePoint => codePoint !== "fe0f")
    .join("-")

  return `https://twemoji.maxcdn.com/v/12.1.3/svg/${file}.svg`
}
