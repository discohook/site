import { IHighlightResult } from "highlight.js"
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react"
import { CodeBlockContainer } from "../styles"
import { highlight } from "./highlight"

type Props = {
  content: string
  language?: string
  preProps?: ComponentPropsWithoutRef<"pre">
}

export default function CodeBlock(props: Props) {
  const { content, language = "", preProps = {} } = props

  const [highlighted, setHighlighted] = useState<IHighlightResult | null>(null)

  useEffect(() => {
    highlight(language, content).then(setHighlighted)
  }, [language, content])

  if (!highlighted)
    return <CodeBlockContainer {...preProps}>{content}</CodeBlockContainer>

  return (
    <CodeBlockContainer
      {...preProps}
      dangerouslySetInnerHTML={{ __html: highlighted.value }}
    />
  )
}
