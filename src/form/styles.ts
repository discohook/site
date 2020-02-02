import { rgb } from "polished"
import styled from "styled-components"

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 8px 0;
`

export const InputLabel = styled.label`
  margin-bottom: 2px;
  font-size: 16px;
`

export const TextInput = styled.input.attrs(({ type }) => ({
  type: type ?? "text",
}))`
  padding: 6px 8px;
  margin: 8px 0;

  background: ${({ theme }) =>
    theme.appearance.color === "dark" ? rgb(64, 68, 75) : rgb(235, 237, 239)};
  border: none;
  border-radius: 3px;
  outline: none;

  color: ${({ theme }) => theme.text.normal};
  font-size: 15px;
  line-height: 20px;

  &:focus {
    box-shadow: ${({ theme }) => theme.elavation.low};
  }
`

export const MultilineTextInput = styled(
  TextInput.withComponent("textarea"),
).attrs({ rows: 3 })`
  resize: vertical;
  min-height: 32px;
`

export const InputNote = styled.div<{ state?: "normal" | "warning" | "error" }>`
  margin: 3px 1px 0 0;

  font-size: 13px;
  font-weight: 500;

  color: ${({ theme, state }) => {
    if (state === "error") return theme.accent.danger
    if (state === "warning") return theme.accent.warning
    return theme.text
  }};

  && {
    flex-grow: 0;
  }
`
