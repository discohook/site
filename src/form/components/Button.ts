import { shade, transparentize } from "polished"
import styled, { css } from "styled-components"
import { darkTheme } from "../../appearance/themes/darkTheme"

export const Button = styled.button.attrs({ type: "button" })<{
  filled?: boolean
}>`
  min-width: 60px;
  min-height: 32px;
  max-height: 32px;
  margin: 8px;
  padding: 2px 15px;

  background: none;
  border: 1px solid ${({ theme }) => transparentize(0.7, theme.accent.primary)};
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  color: ${({ theme }) => theme.accent.primary};

  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  transition: 167ms;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    border-color: ${({ theme }) => transparentize(0.4, theme.accent.primary)};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => transparentize(0.9, theme.accent.primary)};
    border-color: ${({ theme }) => theme.accent.primary};
  }

  ${({ filled = true }) =>
    filled &&
    css`
      background: ${({ theme }) => theme.accent.primary};
      border-color: ${({ theme }) => theme.accent.primary};

      color: ${darkTheme.header.primary};

      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        background: ${({ theme }) => shade(0.1, theme.accent.primary)};
        border-color: ${({ theme }) => shade(0.1, theme.accent.primary)};
      }

      &:active:not(:disabled) {
        background: ${({ theme }) => shade(0.2, theme.accent.primary)};
        border-color: ${({ theme }) => shade(0.2, theme.accent.primary)};
      }
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
