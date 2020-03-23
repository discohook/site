import React from "react"
import { anyScopeRegex, defaultRules } from "simple-markdown"
import { CodeBlock } from "../components/CodeBlock"
import type { MarkdownRule } from "../types/MarkdownRule"

const CODE_BLOCK_RE = /^```(?:([\w+.-]+?)\n)?\n*([^\n][\S\s]*?)\n*```/i

export const codeBlock: MarkdownRule = {
  order: defaultRules.codeBlock.order,
  match: anyScopeRegex(CODE_BLOCK_RE),
  parse: capture => {
    const [, language = "", content] = capture

    return {
      language,
      content,
    }
  },
  react: (node, output, state) => (
    <CodeBlock
      key={state.key}
      language={node.language}
      content={node.content}
    />
  ),
}
