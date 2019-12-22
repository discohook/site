import styled from "@emotion/styled"
import { Theme } from "../appearance/Theme"

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 8px 0;
`

export const InputLabel = styled.label`
  margin-bottom: 2px;
  font-size: 16px;
`

export const TextInput = styled.input<{}, Theme>`
  padding: 6px 8px;
  margin: 8px 0;

  background: ${({ theme }) =>
    theme.appearance.color === "dark" ? "#40444b" : "#ebedef"};
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
TextInput.defaultProps = { type: "text" }

export const MultilineTextInput = styled(TextInput.withComponent("textarea"))`
  resize: vertical;
  min-height: 32px;
`
MultilineTextInput.defaultProps = { rows: 3 }

type InputNoteProps = { state?: "normal" | "warning" | "error" }
export const InputNote = styled.div<InputNoteProps, Theme>`
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

export const FilledButton = styled.button<{}, Theme>`
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

  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;

  transition: 167ms;

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background: #677bc4;
  }

  &:active:not(:disabled) {
    background: #5b6eae;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`
FilledButton.defaultProps = { type: "button" }

export const OutlineButton = styled(FilledButton)<{}, Theme>`
  padding: 2px 15px;

  background: transparent;
  border: 1px solid rgba(114, 137, 218, 0.3);

  color: ${({ theme }) => theme.accent.primary};

  &:hover:not(:disabled),
  &:focus:not(:disabled) {
    background: transparent;
    border-color: rgba(114, 137, 218, 0.6);
  }

  &:active:not(:disabled) {
    background: rgba(114, 137, 218, 0.1);
    border-color: ${({ theme }) => theme.accent.primary};
  }
`
