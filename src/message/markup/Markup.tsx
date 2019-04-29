import React from "react"
import styled from "styled-components"
import { parseMarkup } from "./parseMarkup"

interface Props {
  content: string
  inline?: boolean
}

const MarkupContainer = styled.div`
  font-size: 15px;
  line-height: 1.3;

  white-space: pre-wrap;

  a {
    color: #0096cf;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  code {
    padding: 2.55px;
    margin: -2.55px 0;

    border-radius: 3px;
    background: #2f3136;

    font-size: 12.75px;
  }

  pre {
    max-width: 90%;
    margin: 6px 0 0;
    padding: 7px;

    border: 2px solid rgba(32, 34, 37, 0.3);
    background: #2f3136;
    border-radius: 5px;

    font-size: 14px;
    color: #839496;
  }
`

export const Markup = (props: Props) => (
  <MarkupContainer>{parseMarkup(props.content, props.inline)}</MarkupContainer>
)
