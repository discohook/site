import React, { memo } from "react"
import { PARSERS } from "./parsers/parsers"
import { MarkdownContainer } from "./styles/MarkdownContainer"

export type MarkdownProps = {
  className?: string
  content: string
  type?: keyof typeof PARSERS
}

function MarkdownRenderer(props: MarkdownProps) {
  const { className, content, type = "default" } = props

  const parse = PARSERS[type]

  return (
    <MarkdownContainer className={className}>
      {parse(content.trim())}
    </MarkdownContainer>
  )
}

export const Markdown = memo(MarkdownRenderer)
