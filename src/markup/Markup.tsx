import React, { useMemo } from "react"
import { parseMarkup } from "./parseMarkup"
import { MarkupContainer } from "./styles"

type Props = {
  content: string
  inline?: boolean
  jumboable?: boolean
}

export default function Markup(props: Props) {
  const { content, ...options } = props

  const markup = useMemo(() => {
    return parseMarkup(content.trim(), options)
  }, [content, options])

  return <MarkupContainer>{markup}</MarkupContainer>
}
