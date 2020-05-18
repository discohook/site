import { defaultRules } from "simple-markdown"
import { parseUrl } from "../helpers/parseUrl"
import type { MarkdownRule } from "../parsers/MarkdownRule"
import { link } from "./link"

export const url: MarkdownRule = {
  ...defaultRules.url,
  match: (content, state) => {
    if (!state.inline) return null

    const match = /^((?:https?|steam):\/\/[^\s<]+[^\s"',.:;<\]])/.exec(content)
    if (!match) return null

    let [href] = match
    let searchPosition = 0

    for (let pos = href.length - 1; pos >= 0 && href[pos] === ")"; pos -= 1) {
      const index = href.indexOf("(", searchPosition)

      if (index === -1) {
        href = href.slice(0, -1)
        break
      }

      searchPosition = index + 1
    }

    return [href, href]
  },
  parse: parseUrl,
  react: link.react,
}
