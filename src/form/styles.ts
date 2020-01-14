import { rgb, shade, transparentize } from "polished"
import styled from "styled-components"
import { darkTheme } from "../appearance/themes"

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

export const FilledButton = styled.button.attrs({ type: "button" })`
  min-width: 60px;
  min-height: 32px;
  max-height: 32px;
  margin: 8px;
  padding: 2px 16px;

  background: ${({ theme }) => theme.accent.primary};
  border: none;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  color: ${darkTheme.header.primary};
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  transition: 167ms;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background: ${({ theme }) => shade(0.1, theme.accent.primary)};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => shade(0.2, theme.accent.primary)};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`

export const OutlineButton = styled(FilledButton)`
  padding: 2px 15px;

  background: transparent;
  border: 1px solid ${({ theme }) => transparentize(0.7, theme.accent.primary)};

  color: ${({ theme }) => theme.accent.primary};

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background: transparent;
    border-color: ${({ theme }) => transparentize(0.4, theme.accent.primary)};
  }

  &:active:not(:disabled) {
    background: ${({ theme }) => transparentize(0.9, theme.accent.primary)};
    border-color: ${({ theme }) => theme.accent.primary};
  }
`
