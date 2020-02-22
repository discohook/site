import { defaultRules } from "simple-markdown"
import { parseLink } from "../helpers/parseLink"
import { MarkdownRule } from "../types/MarkdownRule"
import { link } from "./link"

export const autolink: MarkdownRule = {
  ...defaultRules.autolink,
  parse: parseLink,
  react: link.react,
}
