import styled from "styled-components"
import { Clickable } from "./Clickable"

export const Interactive = styled(Clickable)`
  color: ${({ theme }) => theme.interactive.normal};

  &:disabled {
    color: ${({ theme }) => theme.interactive.muted};
  }

  &:not(:disabled):hover {
    color: ${({ theme }) => theme.interactive.hover};
  }

  &:not(:disabled):focus {
    color: ${({ theme }) => theme.interactive.active};
  }
`
