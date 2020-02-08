import { EMOJI_TO_NAME } from "../constants/emojiMaps"

const CANCEL_TAG = String.fromCharCode(0xe007f)
const WAVING_BLACK_FLAG = "🏴"

const getEmoji = (text: string) =>
  EMOJI_TO_NAME.has(text) ? `:${EMOJI_TO_NAME.get(text)}:` : text

// Matches string symbols instead of code points
// Regex extracted from lodash: https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L261
// eslint-disable-next-line no-misleading-character-class
const UNICODE_CHARACTER_RE = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\u20d0-\u20ff\ufe20-\ufe2f]?|[\u0300-\u036f\u20d0-\u20ff\ufe20-\ufe2f]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\u20d0-\u20ff\ufe20-\ufe2f]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\u20d0-\u20ff\ufe20-\ufe2f]|\ud83c[\udffb-\udfff])?)*/g

export const convertEmojiToNames = (text: string) => {
  let result = ""

  let buffer: string | undefined

  for (const char of text.match(UNICODE_CHARACTER_RE) ?? []) {
    if (buffer) {
      if (char === CANCEL_TAG) {
        result += getEmoji(buffer + char)
        buffer = undefined
        continue
      } else if (/^\udb40[\udb61-\udb7a]$/.test(char)) {
        buffer += char
        continue
      } else {
        result += getEmoji(buffer)
        buffer = undefined
      }
    } else if (char === WAVING_BLACK_FLAG) {
      buffer = char
      continue
    }

    result += getEmoji(char)
  }

  return result
}
