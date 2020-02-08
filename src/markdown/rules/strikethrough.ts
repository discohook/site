import { defaultRules, inlineRegex } from "simple-markdown"
import { MarkdownRule } from "../types/MarkdownRule"

export const strikethrough: MarkdownRule = {
  ...defaultRules.del,
  match: inlineRegex(/^~~([\S\s]+?)~~(?!_)/),
}
