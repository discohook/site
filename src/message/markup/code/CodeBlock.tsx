import React, { useEffect, useState } from "react"
import { CodeBlockContainer } from "../styles"
import { highlightCode } from "./highlightCode"

type Props = {
  content: string
  language?: string
}

export default function CodeBlock(props: Props) {
  const { content, language = "" } = props

  const [html, setHtml] = useState<string>()

  useEffect(() => {
    highlightCode(language, content).then(setHtml)
  }, [content, language])

  if (!html) {
    return <CodeBlockContainer>{content}</CodeBlockContainer>
  }

  return <CodeBlockContainer dangerouslySetInnerHTML={{ __html: html }} />
}
