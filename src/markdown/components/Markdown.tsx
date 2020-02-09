import React, { memo } from "react"
import { PARSERS } from "../constants/parsers"
import { MarkdownContainer } from "./MarkdownContainer"

export type MarkdownProps = {
  content: string
  type: "message-content" | "embed-content" | "embed-header"
}

function MarkdownRenderer(props: MarkdownProps) {
  const { content, type } = props

  const parse = PARSERS[type]

  return <MarkdownContainer>{parse(content.trim())}</MarkdownContainer>
}

export const Markdown = memo(MarkdownRenderer)
