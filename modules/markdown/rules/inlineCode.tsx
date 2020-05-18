import React from "react"
import { defaultRules } from "simple-markdown"
import type { MarkdownRule } from "../parsers/MarkdownRule"
import { Code } from "../styles/Code"

export const inlineCode: MarkdownRule = {
  ...defaultRules.inlineCode,
  react: (node, output, state) => <Code key={state.key}>{node.content}</Code>,
}
