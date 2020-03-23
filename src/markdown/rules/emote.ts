import { defaultRules, inlineRegex } from "simple-markdown"
import type { MarkdownRule } from "../types/MarkdownRule"

export const emote: MarkdownRule = {
  order: defaultRules.text.order,
  match: inlineRegex(/^¯\\_\(ツ\)_\/¯/),
  parse: capture => {
    const [content] = capture

    return {
      type: "text",
      content,
    }
  },
  react: null,
}
