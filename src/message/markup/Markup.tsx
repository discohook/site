import React, { useMemo } from "react"
import { parseMarkup } from "./parseMarkup"
import { MarkupContainer } from "./styles"

type Props = {
  content: string
  inline?: boolean
}

export default function Markup(props: Props) {
  const { content, inline } = props

  const markup = useMemo(() => {
    return parseMarkup(String(content).trim(), inline)
  }, [content, inline])

  return <MarkupContainer>{markup}</MarkupContainer>
}
