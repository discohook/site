import React from "react"
import { defaultRules, inlineRegex } from "simple-markdown"
import { Spoiler } from "../components/Spoiler"
import type { MarkdownRule } from "../types/MarkdownRule"

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
