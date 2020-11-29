import styled, { css } from "styled-components"

export const InputConstraint = styled.span<{
  state?: "danger" | "warning" | "normal"
}>`
  margin-left: 6.5px;

  color: ${({ theme }) => theme.text.normal};
  font-size: 13px;
  font-weight: 500;
  font-style: italic;

  ${({ state: color = "normal" }) =>
    color !== "normal" &&
    css`
      color: ${({ theme }) => theme.accent[color]};
    `};
`
