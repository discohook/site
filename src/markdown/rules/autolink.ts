import { defaultRules } from "simple-markdown"
import { parseLink } from "../helpers/parseLink"
import { MarkdownRule } from "../types/MarkdownRule"

export const autolink: MarkdownRule = {
  ...defaultRules.autolink,
  parse: parseLink,
}
