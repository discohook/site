import { IHighlightResult } from "highlight.js"
import React, { useEffect, useState } from "react"
import { CodeBlockContainer } from "../styles"
import { highlight } from "./highlight"

type Props = {
  content: string
  language?: string
}

export default function CodeBlock(props: Props) {
  const { content, language = "" } = props

  const [highlighted, setHighlighted] = useState<IHighlightResult | undefined>()

  useEffect(() => {
    highlight(language, content).then(setHighlighted)
  }, [language, content])

  if (!highlighted) return <CodeBlockContainer>{content}</CodeBlockContainer>

  return (
    <CodeBlockContainer
      dangerouslySetInnerHTML={{ __html: highlighted.value }}
    />
  )
}
