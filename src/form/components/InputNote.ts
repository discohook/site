import styled from "styled-components"

export const InputNote = styled.div<{
  state?: "normal" | "warning" | "error"
}>`
  margin: 3px 1px 0 0;

  font-size: 13px;
  font-weight: 500;

  color: ${({ theme, state }) => {
    if (state === "error") {
      return theme.accent.danger
    }
    if (state === "warning") {
      return theme.accent.warning
    }
    return theme.text
  }};

  && {
    flex-grow: 0;
  }
`
