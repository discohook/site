import { rgb } from "polished"
import styled from "styled-components"
import { DARK_THEME } from "../../theming/darkTheme"
import type { Theme } from "../../theming/Theme"
import { Button } from "./Button"

export const PrimaryButton = styled(Button)<{ accent?: keyof Theme["accent"] }>`
  background: ${({ theme, accent = "primary" }) => theme.accent[accent]};
  border-color: ${({ theme, accent = "primary" }) => theme.accent[accent]};
  color: ${DARK_THEME.header.primary};

  &:hover {
    background: ${rgb(71, 82, 196)};
    border-color: ${rgb(71, 82, 196)};
  }

  &:focus {
    border-color: ${({ theme }) => theme.interactive.active};
  }

  &:active {
    background: ${rgb(60, 69, 165)};
    border-color: ${rgb(60, 69, 165)};
  }

  &:disabled {
    background: transparent;
    border-color: ${({ theme }) => theme.interactive.muted};
    color: ${({ theme }) => theme.text.muted};
  }
`
