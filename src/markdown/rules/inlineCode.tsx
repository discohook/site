import React from "react"
import { defaultRules } from "simple-markdown"
import { Code } from "../components/Code"
import type { MarkdownRule } from "../types/MarkdownRule"

export const inlineCode: MarkdownRule = {
  ...defaultRules.inlineCode,
  react: (node, output, state) => <Code key={state.key}>{node.content}</Code>,
}
