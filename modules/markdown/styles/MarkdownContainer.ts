import styled, { css } from "styled-components"

export const MarkdownContainer = styled.div`
  white-space: pre-wrap;
  word-wrap: break-word;
  line-height: 1.375;

  ${({ theme }) =>
    theme.appearance.color === "light" &&
    css`
      @media (max-resolution: 1dppx) {
        font-weight: 500;
      }
    `}
`
