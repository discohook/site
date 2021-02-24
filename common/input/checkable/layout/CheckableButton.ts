import { cover, size } from "polished"
import styled from "styled-components"

export const CheckableButton = styled.div`
  ${cover()};
  ${size("100%")};

  background: ${({ theme }) => theme.background.secondaryAlt};
  border: 2px solid ${({ theme }) => theme.background.secondaryAlt};
  color: ${({ theme }) => theme.interactive.active};

  pointer-events: none;

  transition: 150ms;
  transition-property: background-color, border-color, color;

  input:hover + && {
    background: ${({ theme }) => theme.interactive.muted};
    border-color: ${({ theme }) => theme.interactive.muted};
  }

  input:focus + && {
    border-color: ${({ theme }) => theme.accent.primary};
  }

  input:disabled + && {
    background: transparent;
    border-color: ${({ theme }) => theme.interactive.muted};
    color: ${({ theme }) => theme.interactive.muted};
  }
`
