import { transparentize } from "polished"
import styled from "styled-components"
import { Button } from "./Button"

export const SecondaryButton = styled(Button)`
  border-color: ${({ theme }) => transparentize(0.5, theme.interactive.normal)};
  color: ${({ theme }) => theme.header.primary};

  &:hover {
    background: ${({ theme }) => theme.backgroundModifier.active};
  }

  &:focus {
    border-color: ${({ theme }) => theme.accent.primary};
  }

  &:active {
    background: ${({ theme }) => theme.background.tertiary};
    border-color: ${({ theme }) => theme.background.tertiary};
  }

  &:disabled {
    background: transparent;
    border-color: ${({ theme }) => theme.interactive.muted};
    color: ${({ theme }) => theme.text.muted};
  }
`
