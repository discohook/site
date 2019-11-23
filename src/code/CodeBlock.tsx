import React, { useEffect, useState } from "react"
import { SERVER } from "../core/environment"
import { CodeBlockContainer } from "../markup/styles"
import { aliases } from "./aliases"
import { highlightCode } from "./highlightCode"
import { hljs } from "./hljs"
import { importLanguage } from "./importLanguage"
import { languages } from "./languages"

if (SERVER) {
  Promise.all(
    languages.map(async language => importLanguage(language.name)),
  ).catch(error => {
    console.error("Error importing language", error)
  })
}

type Props = {
  content: string
  language?: string
}

export default function CodeBlock(props: Props) {
  const { content, language = "" } = props

  const [html, setHtml] = useState<string>()
  useEffect(() => {
    highlightCode(language, content)
      .then(setHtml)
      .catch(() => setHtml(undefined))
  }, [content, language])

  if (process.env.SERVER) {
    const safeLanguage = aliases[language]?.name ?? "plaintext"

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

  return <CodeBlockContainer dangerouslySetInnerHTML={{ __html: html }} />
}
