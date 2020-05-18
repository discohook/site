import { defaultRules } from "simple-markdown"
import { parseUrl } from "../helpers/parseUrl"
import type { MarkdownRule } from "../parsers/MarkdownRule"
import { link } from "./link"

export const autolink: MarkdownRule = {
  ...defaultRules.autolink,
  parse: parseUrl,
  react: link.react,
}
