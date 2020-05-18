import { defaultRules, inlineRegex } from "simple-markdown"
import type { MarkdownRule } from "../parsers/MarkdownRule"

export const strikethrough: MarkdownRule = {
  ...defaultRules.del,
  match: inlineRegex(/^~~([\S\s]+?)~~(?!_)/),
}
