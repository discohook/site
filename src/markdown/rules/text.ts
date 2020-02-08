import { defaultRules } from "simple-markdown"
import { convertEmojiToNames } from "../helpers/convertEmojiToNames"
import { MarkdownRule } from "../types/MarkdownRule"

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
