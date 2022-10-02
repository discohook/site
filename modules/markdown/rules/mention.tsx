import React from "react"
import { defaultRules, inlineRegex } from "simple-markdown"
import type { MarkdownRule } from "../parsers/MarkdownRule"
import { Mention } from "../styles/Mention"

const MENTION_RE = /^<(@!?|@&|#)(\d+)>|^<(\/(?! )[\w -]*[\w-]):(\d+)>|^(@(?:everyone|here))/

const MENTION_TYPES = new Map(
  Object.entries({
    "@": "user",
    "@!": "user",
    "@&": "role",
    "#": "channel",
  }),
)

const MENTION_MATCHERS_CONTENT = new Map(
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
    const [, matcher, matchedId, command, commandId, everyoneOrHere] = capture

    if (command) {
      return {
        mentionType: "command",
        mentionId: commandId,
        content: command,
      }
    }

    if (everyoneOrHere) {
      return {
        mentionType: "everyone-here",
        content: everyoneOrHere,
      }
    }

    return {
      mentionType: MENTION_TYPES.get(matcher),
      mentionId: matchedId,
      content: MENTION_MATCHERS_CONTENT.get(matcher),
    }
  },
  react: (node, output, state) => (
    <Mention
      key={state.key}
      data-mention-type={node.mentionType}
      data-mention-id={node.mentionId}
    >
      {node.content}
    </Mention>
  ),
}
