import { shade, tint } from "polished"
import styled from "styled-components"
import { DARK_THEME } from "../../theming/darkTheme"
import type { Theme } from "../../theming/Theme"
import { Button } from "./Button"

export const PrimaryButton = styled(Button)<{ accent?: keyof Theme["accent"] }>`
  background: ${({ theme, accent = "primary" }) => theme.accent[accent]};
  border-color: ${({ theme, accent = "primary" }) => theme.accent[accent]};
  color: ${DARK_THEME.header.primary};

  &:hover {
    background: ${({ theme, accent = "primary" }) =>
      tint(0.2, theme.accent[accent])};
    border-color: ${({ theme, accent = "primary" }) =>
      tint(0.2, theme.accent[accent])};
  }

  &:focus {
    border-color: ${({ theme }) => theme.interactive.active};
  }

  &:active {
    background: ${({ theme, accent = "primary" }) =>
      shade(
        theme.appearance.color === "dark" ? 0.3 : 0.1,
        theme.accent[accent],
      )};
    border-color: ${({ theme, accent = "primary" }) =>
      shade(
        theme.appearance.color === "dark" ? 0.3 : 0.1,
        theme.accent[accent],
      )};
  }

  &:disabled {
    background: transparent;
    border-color: ${({ theme }) => theme.interactive.muted};
    color: ${({ theme }) => theme.text.muted};
  }
`
