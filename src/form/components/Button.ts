import { shade, transparentize } from "polished"
import styled, { css } from "styled-components"
import { DARK_THEME } from "../../appearance/constants/darkTheme"
import type { Theme } from "../../appearance/types/Theme"
import { BaseModalFooter } from "../../modal/components/BaseModalFooter"

export const Button = styled.button.attrs({ type: "button" })<{
  variant?: "filled" | "outline" | "borderless"
  size?: "small" | "medium"
  accent?: keyof Theme["accent"]
}>`
  ${({ size = "small" }) =>
    size === "small" &&
    css`
      min-width: 60px;
      min-height: 32px;
      max-height: 32px;
    `}

  ${({ size }) =>
    size === "medium" &&
    css`
      height: 38px;
      min-width: 96px;
      min-height: 38px;
    `}

  margin: 8px;
  padding: 2px 15px;

  background: none;
  border: 1px solid transparent;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  color: ${({ theme, accent = "primary" }) => theme.accent[accent]};

  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  transition: 167ms;

  ${({ variant = "filled", accent = "primary" }) =>
    variant === "filled" &&
    css`
      background: ${({ theme }) => theme.accent[accent]};
      border-color: ${({ theme }) => theme.accent[accent]};

      color: ${DARK_THEME.header.primary};

      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        background: ${({ theme }) => shade(0.1, theme.accent[accent])};
        border-color: ${({ theme }) => shade(0.1, theme.accent[accent])};
      }

      &:active:not(:disabled) {
        background: ${({ theme }) => shade(0.2, theme.accent[accent])};
        border-color: ${({ theme }) => shade(0.2, theme.accent[accent])};
      }
    `}

  ${({ variant, accent = "primary" }) =>
    variant === "outline" &&
    css`
      border-color: ${({ theme }) => transparentize(0.7, theme.accent[accent])};

      &:hover:not(:disabled),
      &:focus:not(:disabled) {
        border-color: ${({ theme }) =>
          transparentize(0.4, theme.accent[accent])};
      }

      &:active:not(:disabled) {
        background: ${({ theme }) => transparentize(0.9, theme.accent[accent])};
        border-color: ${({ theme }) => theme.accent[accent]};
      }
    `}

  ${({ variant }) =>
    variant === "borderless" &&
    css`
      transition: none;
      color: ${({ theme }) => theme.interactive.active};

      &:hover:not(:disabled),
      &:focus:not(:disabled),
      &:active:not(:disabled) {
        text-decoration: underline;
      }
    `}

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }

  ${BaseModalFooter} & {
    margin: 0 0 0 16px;

    ${({ variant }) =>
      variant === "borderless" &&
      css`
        min-width: 0;
        margin: 0;
      `}
  }
`
