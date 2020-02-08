import React from "react"
import { PARSERS } from "../constants/parsers"
import { MarkdownContainer } from "./MarkdownContainer"

export type MarkdownProps = {
  content: string
  type: "message-content" | "embed-content" | "embed-header"
}

export function Markdown(props: MarkdownProps) {
  const { content, type } = props

  const parse = PARSERS[type]

  return <MarkdownContainer>{parse(content.trim())}</MarkdownContainer>
}
