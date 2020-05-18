import { defaultRules } from "simple-markdown"
import { convertEmojiToNames } from "../emoji/convertEmojiToNames"
import type { MarkdownRule } from "../parsers/MarkdownRule"

export const text: MarkdownRule = {
  ...defaultRules.text,
  parse: (capture, parse, state) => {
    const [content] = capture
    const { nested } = state

    if (nested) {
      return {
        content,
      }
    }

    return parse(convertEmojiToNames(content), {
      ...state,
      nested: true,
    })
  },
}
