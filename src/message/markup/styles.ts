import styled from "@emotion/styled"
import { Theme } from "../../themes"

export const MarkupContainer = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  display: inline;
`

export const Code = styled.code<{}, Theme>`
  padding: 2.55px;
  margin: -2.55px 0;

  border-radius: 3px;
  background: ${({ theme }) => theme.message.code.background};

  font-size: 12.75px;
`

export const Emoji = styled.img<{ big?: boolean }, Theme>`
  width: ${({ theme, big }) =>
    big && theme.display === "cozy" ? "32px" : "21.75px"};
  height: ${({ theme, big }) =>
    big && theme.display === "cozy" ? "32px" : "21.75px"};

  object-fit: contain;

  vertical-align: ${({ big }) => (big ? "-4.5px" : "-6px")};
  margin: ${({ big }) => (big ? "3px" : "0")} 1.5px 0 0.75px;
`

export const Mention = styled.span<{}, Theme>`
  padding: 0 2px;
  cursor: pointer;

  background: ${({ theme }) => theme.message.mention.normal};
  color: ${({ theme }) => theme.message.mention.normalText};
  font-weight: 500;

  &:hover {
    background: ${({ theme }) => theme.message.mention.hover};
    color: ${({ theme }) => theme.message.mention.hoverText};
  }
`

export const Spoiler = styled.span<{}, Theme>`
  background: ${({ theme }) => theme.message.spoiler};
  border-radius: 3px;
`

export const BlockQuote = styled.blockquote<{}, Theme>`
  box-sizing: border-box;
  max-width: 90%;

  margin: 8px 0;
  padding: 0 8px 0 12px;

  border-left: 4px solid ${({ theme }) => theme.message.blockQuote};
`

export const CodeBlockContainer = styled.pre<{}, Theme>`
  max-width: 90%;
  margin: 6px 0 0;
  padding: 7px;

  background: ${({ theme }) => theme.message.code.background};
  border: 2px solid ${({ theme }) => theme.message.code.border};
  border-radius: 5px;

  color: ${({ theme }) => theme.message.code.text};
  font-size: 14px;

  white-space: pre-wrap;

  & .hljs-comment,
  & .hljs-quote {
    color: ${({ theme }) => theme.message.code.comment};
  }

  /* Solarized Green */
  & .hljs-keyword,
  & .hljs-selector-tag,
  & .hljs-addition {
    color: #859900;
  }

  /* Solarized Cyan */
  & .hljs-number,
  & .hljs-string,
  & .hljs-meta .hljs-meta-string,
  & .hljs-literal,
  & .hljs-doctag,
  & .hljs-regexp {
    color: #2aa198;
  }

  /* Solarized Blue */
  & .hljs-title,
  & .hljs-section,
  & .hljs-name,
  & .hljs-selector-id,
  & .hljs-selector-class {
    color: #268bd2;
  }

  /* Solarized Yellow */
  & .hljs-attribute,
  & .hljs-attr,
  & .hljs-variable,
  & .hljs-template-variable,
  & .hljs-class .hljs-title,
  & .hljs-type {
    color: #b58900;
  }

  /* Solarized Orange */
  & .hljs-symbol,
  & .hljs-bullet,
  & .hljs-subst,
  & .hljs-meta,
  & .hljs-meta .hljs-keyword,
  & .hljs-selector-attr,
  & .hljs-selector-pseudo,
  & .hljs-link {
    color: #cb4b16;
  }

  /* Solarized Red */
  & .hljs-built_in,
  & .hljs-deletion {
    color: #dc322f;
  }

  & .hljs-formula {
    background: ${({ theme }) => theme.message.code.formula};
  }

  & .hljs-emphasis {
    font-style: italic;
  }

  & .hljs-strong {
    font-weight: bold;
  }
`
