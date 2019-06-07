import styled from "@emotion/styled"
import React from "react"
import { parseMarkup } from "./parseMarkup"

interface Props {
  content: string
  inline?: boolean
}

const MarkupContainer = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;

  a {
    color: ${(props) => props.theme.link};
    text-decoration: none;

    :hover {
      text-decoration: underline;
    }
  }

  code {
    padding: 2.55px;
    margin: -2.55px 0;

    border-radius: 3px;
    background: ${(props) => props.theme.code.background};

    font-size: 12.75px;
  }

  pre {
    max-width: 90%;
    margin: 6px 0 0;
    padding: 7px;

    border: 2px solid ${(props) => props.theme.code.border};
    background: ${(props) => props.theme.code.background};
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
      width: ${(props) =>
        props.theme.display === "cozy" ? "32px" : "21.75px"};
      height: ${(props) =>
        props.theme.display === "cozy" ? "32px" : "21.75px"};

      vertical-align: -4.5px;
      margin: 3px 1.5px 0 0.75px;
    }
  }

  span.spoiler {
    background: ${(props) => props.theme.spoiler};
    border-radius: 3px;
  }

  span.mention {
    padding: 0 2px;
    cursor: pointer;

    background: ${(props) => props.theme.mention.normal};
    color: ${(props) => props.theme.mention.normalText};
    font-weight: 500;

    :hover {
      background: ${(props) => props.theme.mention.hover};
      color: ${(props) => props.theme.mention.hoverText};
    }
  }
`

export default function Markup(props: Props) {
  const { content, inline } = props

  return (
    <MarkupContainer className="markup">
      {parseMarkup(content.trim(), inline)}
    </MarkupContainer>
  )
}
