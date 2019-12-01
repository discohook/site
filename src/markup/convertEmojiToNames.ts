import { emojiToName } from "./emoji"

const cancelTag = String.fromCharCode(0xe007f)
const blackFlag = "🏴"

const getEmoji = (text: string) =>
  emojiToName.has(text) ? `:${emojiToName.get(text)}:` : text

// Regex extracted from lodash, matches unicode characters unlike Array.from(string)
// https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L261
// eslint-disable-next-line unicorn/no-unsafe-regex
const unicodeRegExp = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]?|[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\ufe20-\ufe2f\u20d0-\u20ff]|\ud83c[\udffb-\udfff])?)*/g

export const convertEmojiToNames = (text: string) => {
  let result = ""

  let buffer: string | undefined

  for (const char of text.match(unicodeRegExp) ?? []) {
    if (buffer) {
      if (char === cancelTag) {
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
    } else if (char === blackFlag) {
      buffer = char
      continue
    }

    result += getEmoji(char)
  }

  return result
}
