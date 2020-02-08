import { defaultRules } from "simple-markdown"
import { parseLink } from "../helpers/parseLink"
import { MarkdownRule } from "../types/MarkdownRule"

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
  parse: parseLink,
}
