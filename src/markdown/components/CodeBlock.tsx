/* eslint-disable import/newline-after-import */

import React, { useEffect, useState } from "react"
import { getLanguageFromAlias } from "../helpers/getLanguageFromAlias"
import { highlightCode } from "../helpers/highlightCode"
import { CodeBlockContainer } from "./CodeBlockContainer"
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

  if (SERVER) {
    const safeLanguage = getLanguageFromAlias(language)?.name ?? "plaintext"

    return (
      <CodeBlockContainer
        dangerouslySetInnerHTML={{
          // eslint-disable-next-line @typescript-eslint/naming-convention
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
        // eslint-disable-next-line @typescript-eslint/naming-convention
        __html: html,
      }}
    />
  )
}
