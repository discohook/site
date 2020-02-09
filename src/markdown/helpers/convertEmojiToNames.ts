import { UNICODE_CHARACTER_RE } from "../constants/constants"
import { EMOJI_TO_NAME } from "../constants/emojiMaps"

const CANCEL_TAG = String.fromCharCode(0xe007f)
const WAVING_BLACK_FLAG = "🏴"

const getEmoji = (text: string) =>
  EMOJI_TO_NAME.has(text) ? `:${EMOJI_TO_NAME.get(text)}:` : text

export const convertEmojiToNames = (text: string) => {
  let result = ""

  let buffer: string | undefined

  // eslint-disable-next-line @typescript-eslint/prefer-regexp-exec
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
