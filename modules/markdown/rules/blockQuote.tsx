import React from "react"
import { defaultRules } from "simple-markdown"
import type { MarkdownRule } from "../parsers/MarkdownRule"
import { BlockQuote } from "../styles/BlockQuote"

const BEGINNING_OF_LINE_RE = /^$|\n *$/
const BLOCK_QUOTE_RE = /^( *>>> +([\S\s]*))|^( *>(?!>>) +[^\n]*(\n *>(?!>>) +[^\n]*)*\n?)/

const SINGLELINE_QUOTE_RE = /^ *> ?/gm
const MULTILINE_QUOTE_RE = /^ *>>> ?/

export const blockQuote: MarkdownRule = {
  ...defaultRules.blockQuote,
  match: (source, state) => {
    const { nested, inQuote, prevCapture: lookbehind } = state

    // Prevents having multiple layers of quote blocks
    if (nested) return null
    if (inQuote) return null

    // Makes sure that quotes can only start on the beginning of a line
    if (!BEGINNING_OF_LINE_RE.test(lookbehind?.[0] ?? "")) return null

    return BLOCK_QUOTE_RE.exec(source)
  },
  parse: (capture, parse, state) => {
    const [content] = capture
    const { inline = false } = state

    // Determine whether or not the quote block is multi-line
    const multiline = MULTILINE_QUOTE_RE.test(capture[0])

    // Removes the '>' symbols from content
    const trimRegex = multiline ? MULTILINE_QUOTE_RE : SINGLELINE_QUOTE_RE
    const trimmedContent = content.replace(trimRegex, "")

    // Parses the trimmed content for any markdown
    const parsedContent = parse(trimmedContent, {
      ...state,
      inline: multiline ? inline : true,
      inQuote: true,
    })

    // Makes sure the block quote always renders, even without content
    if (parsedContent.length === 0) {
      parsedContent.push({
        type: "text",
        content: " ",
      })
    }

    return {
      content: parsedContent,
    }
  },
  react: (node, output, state) => (
    <BlockQuote key={state.key}>{output(node.content, state)}</BlockQuote>
  ),
}
