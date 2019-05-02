import React from "react"
import styled from "styled-components"
import { parseMarkup } from "./parseMarkup"

interface Props {
  content: string
  inline?: boolean
}

const MarkupContainer = styled.div`
  white-space: pre-wrap;

  a {
    color: #0096cf;
    text-decoration: none;

    :hover {
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

  img.emoji {
    width: 21.75px;
    height: 21.75px;
    object-fit: contain;

    vertical-align: -6px;
    margin: 0 1.5px 0 0.75px;

    &.jumboable {
      width: 32px;
      height: 32px;
    }
  }
`

export const Markup = (props: Props) => (
  <MarkupContainer>
    {parseMarkup(props.content.trim(), props.inline)}
  </MarkupContainer>
)
