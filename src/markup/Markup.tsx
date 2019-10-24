import React, { memo } from "react"
import { parseMarkup } from "./parseMarkup"
import { MarkupContainer } from "./styles"

type Props = {
  content: string
  inline?: boolean
  jumboable?: boolean
}

function Markup(props: Props) {
  const { content, ...options } = props

  return (
    <MarkupContainer>{parseMarkup(content.trim(), options)}</MarkupContainer>
  )
}

export default memo(Markup)
