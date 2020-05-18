/* eslint-disable import/newline-after-import */

import React, { useEffect, useState } from "react"
import { CodeBlockContainer } from "../styles/CodeBlockContainer"
import { getLanguageFromAlias } from "./getLanguageFromAlias"
import { highlightCode } from "./highlightCode"
const hljs = require("highlight.js/lib/highlight") as typeof import("highlight.js")

export type CodeBlockProps = {
  content: string
  language?: string
}

export function CodeBlock(props: CodeBlockProps) {
  const { content, language = "" } = props

  const [html, setHtml] = useState<string>()
  useEffect(() => {
    highlightCode(language, content)
      .then(setHtml)
      .catch(() => setHtml(undefined))
  }, [content, language])

  if (typeof window === "undefined") {
    const safeLanguage = getLanguageFromAlias(language)?.name ?? "plaintext"

    return (
      <CodeBlockContainer
        dangerouslySetInnerHTML={{
          __html: hljs.highlight(safeLanguage, content).value,
        }}
      />
    )
  }

  if (!html) {
    return <CodeBlockContainer>{content}</CodeBlockContainer>
  }

  return (
    <CodeBlockContainer
      dangerouslySetInnerHTML={{
        __html: html,
      }}
    />
  )
}
