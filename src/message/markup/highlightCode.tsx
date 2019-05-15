import { getLanguage, highlight } from "highlight.js"
import React, { ComponentPropsWithoutRef } from "react"
import styled from "styled-components"

const CodeBlock = styled.pre`
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

export const highlightCode = (
  language: string,
  content: string,
  attributes: ComponentPropsWithoutRef<"pre">,
) => {
  if (!getLanguage(language))
    return <CodeBlock {...attributes}>{content}</CodeBlock>

  const { value: html } = highlight(language, content, true)
  return (
    <CodeBlock {...attributes} dangerouslySetInnerHTML={{ __html: html }} />
  )
}
