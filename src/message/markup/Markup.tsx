import React from "react"
import { parseMarkup } from "./parseMarkup"
import { MarkupContainer } from "./styles"

interface Props {
  content: string
  inline?: boolean
}

export default function Markup(props: Props) {
  const { content, inline } = props

  return (
    <MarkupContainer>{parseMarkup(content.trim(), inline)}</MarkupContainer>
  )
}
