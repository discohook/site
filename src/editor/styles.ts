import styled, { StyledComponent } from "@emotion/styled"
import { Theme } from "../core/themes"

type SC<Tag extends keyof JSX.IntrinsicElements> = StyledComponent<
  JSX.IntrinsicElements[Tag],
  Omit<JSX.IntrinsicElements[Tag], "ref" | "key">,
  Theme
>

export const Container = styled.div<{ flow?: "column" | "row" }, Theme>`
  display: flex;
  flex-direction: ${({ flow }) => flow || "column"};
  flex-wrap: ${({ flow }) => (flow === "row" ? "wrap" : "nowrap")};

  & > *:not(button) {
    flex-grow: 1;
  }

  & > button {
    align-self: flex-end;
  }
`

export const BoxContainer = styled.div<{}, Theme>`
  display: flex;
  flex-direction: column;

  margin: 8px;
  padding: 8px 4px 4px;

  border: 1px solid ${({ theme }) => theme.backgroundModifier.accent};
  border-radius: 3px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > * {
    flex-grow: 1;
  }
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 4px 8px 0;
`

export const InputLabel = styled.label``

export const TextInput = styled.input<{}, Theme>`
  padding: 6px 8px;
  margin: 8px 0;

  background: ${({ theme }) => theme.textAreaBackground};
  border: 0;
  border-radius: 3px;
  outline: none;

  color: ${({ theme }) => theme.text.normal};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;
`
TextInput.defaultProps = { type: "text" }

export const MultilineTextInput = styled(TextInput.withComponent("textarea"))`
  resize: vertical;
  min-height: 32px;
` as SC<"textarea">
MultilineTextInput.defaultProps = { rows: 2 }

type InputNoteProps = { state: "normal" | "warning" | "error" }
export const InputNote = styled.div<InputNoteProps, Theme>`
  && {
    flex-grow: 0;
    margin: 3px 1px 0 0;

    font-size: 13px;
    font-weight: 500;

    color: ${({ theme, state }) => {
      if (state === "error") return theme.red
      if (state === "warning") return theme.yellow
      return theme.text
    }};
  }
`

export const Button = styled.button<{}, Theme>`
  min-height: 32px;
  max-height: 32px;
  margin: 4px 8px 8px;
  padding: 0 10px;

  background: transparent;
  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  color: ${({ theme }) => theme.header.primary};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;

  transition: background-color 300ms;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.accent};
  }

  &:disabled {
    color: ${({ theme }) => theme.header.secondary};
    cursor: not-allowed;
  }
`
Button.defaultProps = { type: "button" }

export const ToggleButton = styled(Button)<{ filled: boolean }, Theme>`
  && {
    background: ${({ theme, filled }) =>
      filled ? theme.accent : "transparent"};
    color: ${({ theme }) => theme.header.primary};
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  margin: 8px 12px -2px;
`

export const ActionsHeader = styled.span`
  flex: 1;
`

export const Action = styled.button<{}, Theme>`
  padding: 0;
  margin: 0 4px 0 0;

  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  color: ${({ theme }) => theme.header.primary};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.4px;

  &:hover {
    text-decoration: underline;
  }

  * + & {
    margin: 0 4px 0 8px;
  }
`
Action.defaultProps = { type: "button" }
