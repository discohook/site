import React from "react"
import { defaultRules, inlineRegex } from "simple-markdown"
import type { MarkdownRule } from "../parsers/MarkdownRule"
import { Mention } from "../styles/Mention"

const MENTION_RE = /^<(@!?|@&|#)\d+>|^(@(?:everyone|here))/

const MENTION_TYPES = new Map(
  Object.entries({
    "@": "@user",
    "@!": "@user",
    "@&": "@role",
    "#": "#channel",
  }),
)

export const mention: MarkdownRule = {
  order: defaultRules.text.order,
  match: inlineRegex(MENTION_RE),
  parse: capture => {
    const [, type, everyoneOrHere] = capture

    if (everyoneOrHere) {
      return {
        content: everyoneOrHere,
      }
    }

    return {
      content: MENTION_TYPES.get(type),
    }
  },
  react: (node, output, state) => (
    <Mention key={state.key}>{node.content}</Mention>
  ),
}
