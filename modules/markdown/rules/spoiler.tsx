import React from "react"
import { defaultRules, inlineRegex } from "simple-markdown"
import type { MarkdownRule } from "../parsers/MarkdownRule"
import { Spoiler } from "../styles/Spoiler"

export const spoiler: MarkdownRule = {
  order: defaultRules.text.order,
  match: inlineRegex(/^\|\|([\S\s]+?)\|\|/),
  parse: (capture, parse, state) => ({
    content: parse(capture[1], state),
  }),
  react: (node, output, state) => (
    <Spoiler key={state.key}>{output(node.content, state)}</Spoiler>
  ),
}
