import React from "react"
import { defaultRules, inlineRegex } from "simple-markdown"
import { Mention } from "../components/Mention"
import { MENTION_TYPES } from "../constants/constants"
import { MarkdownRule } from "../types/MarkdownRule"

const MENTION_RE = /^<(@!?|@&|#)\d+>|^@(everyone|here)/

export const mention: MarkdownRule = {
  order: defaultRules.text.order,
  match: inlineRegex(MENTION_RE),
  parse: capture => {
    const [, type, everyoneOrHere] = capture
    if (everyoneOrHere) {
      return {
        content: `@${everyoneOrHere}`,
      }
    }

    return {
      content: `@unknown-${MENTION_TYPES[type as keyof typeof MENTION_TYPES]}`,
    }
  },
  react: (node, output, state) => (
    <Mention key={state.key}>{node.content}</Mention>
  ),
}
