import styled from "@emotion/styled"
import { IHighlightResult } from "highlight.js"
import React, { ComponentPropsWithoutRef, useEffect, useState } from "react"
import { highlight } from "./highlight"

interface Props {
  content: string
  language?: string
  preProps?: ComponentPropsWithoutRef<"pre">
}

const Container = styled.pre`
  background: ${(props) => props.theme.code.background};
  color: ${(props) => props.theme.code.text};

  .hljs-comment,
  .hljs-quote {
    color: ${(props) => props.theme.code.comment};
  }

  /* Solarized Green */
  .hljs-keyword,
  .hljs-selector-tag,
  .hljs-addition {
    color: #859900;
  }

  /* Solarized Cyan */
  .hljs-number,
  .hljs-string,
  .hljs-meta .hljs-meta-string,
  .hljs-literal,
  .hljs-doctag,
  .hljs-regexp {
    color: #2aa198;
  }

  /* Solarized Blue */
  .hljs-title,
  .hljs-section,
  .hljs-name,
  .hljs-selector-id,
  .hljs-selector-class {
    color: #268bd2;
  }

  /* Solarized Yellow */
  .hljs-attribute,
  .hljs-attr,
  .hljs-variable,
  .hljs-template-variable,
  .hljs-class .hljs-title,
  .hljs-type {
    color: #b58900;
  }

  /* Solarized Orange */
  .hljs-symbol,
  .hljs-bullet,
  .hljs-subst,
  .hljs-meta,
  .hljs-meta .hljs-keyword,
  .hljs-selector-attr,
  .hljs-selector-pseudo,
  .hljs-link {
    color: #cb4b16;
  }

  /* Solarized Red */
  .hljs-built_in,
  .hljs-deletion {
    color: #dc322f;
  }

  .hljs-formula {
    background: ${(props) => props.theme.code.formula};
  }

  .hljs-emphasis {
    font-style: italic;
  }

  .hljs-strong {
    font-weight: bold;
  }
`

export default function CodeBlock(props: Props) {
  const { content, language = "", preProps = {} } = props

  const [highlighted, setHighlighted] = useState<IHighlightResult | null>(null)

  useEffect(() => {
    highlight(language, content).then(setHighlighted)
  }, [props.language, props.content])

  if (!highlighted) return <Container {...preProps}>{content}</Container>

  return (
    <Container
      {...preProps}
      dangerouslySetInnerHTML={{ __html: highlighted.value }}
    />
  )
}
