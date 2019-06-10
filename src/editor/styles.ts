import styled, { StyledComponent } from "@emotion/styled"
import { Theme } from "../themes"

type SC<Tag extends keyof JSX.IntrinsicElements> = StyledComponent<
  JSX.IntrinsicElements[Tag],
  Omit<JSX.IntrinsicElements[Tag], "ref" | "key">,
  Theme
>

export const Container = styled.div<{ direction?: "column" | "row" }>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  flex-wrap: ${({ direction }) => (direction === "row" ? "wrap" : "nowrap")};

  > *:not(button) {
    flex-grow: 1;
  }

  > button {
    align-self: flex-end;
  }
`

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 8px;
  padding: 8px;

  border: 1px solid ${({ theme }) => theme.editor.border};
  border-radius: 3px;
`

export const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  > * {
    flex-grow: 1;
  }
`

export const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 8px 8px 0;
`

export const TextInput = styled.input`
  padding: 10px;
  margin: 8px 0;

  background: ${({ theme }) => theme.editor.input};
  border: 0;
  border-radius: 3px;
  outline: none;

  color: ${({ theme }) => theme.text};
  font-family: ${({ theme }) => theme.fonts.normal};
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;
`
TextInput.defaultProps = { type: "text" }

export const MultilineTextInput = styled(TextInput.withComponent("textarea"))`
  resize: vertical;
  min-height: 60px;
` as SC<"textarea">

export const Button = styled.button`
  min-height: 40px;
  max-height: 40px;
  margin: 8px;
  padding: 0 16px;

  background: transparent;
  border: 1px solid ${({ theme }) => theme.accent};
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  color: ${({ theme }) => theme.editor.button.enabled};
  font-family: ${({ theme }) => theme.fonts.normal};
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;

  transition: background-color 300ms;

  :hover:not(:disabled) {
    background: ${({ theme }) => theme.accent};
  }

  :disabled {
    color: ${({ theme }) => theme.editor.button.disabled};
    cursor: not-allowed;
  }
`

export const ToggleButton = styled(Button)<{ filled: boolean }>`
  &,
  :hover:not(:disabled) {
    background: ${({ theme, filled }) =>
      filled ? theme.accent : "transparent"};
    color: ${({ theme, filled }) =>
      filled ? theme.editor.button.filled : theme.editor.button.enabled};
  }
`

export const ActionsContainer = styled.div`
  display: flex;
  margin: 8px 12px -2px;
`

export const ActionsHeader = styled.span`
  flex: 1;
`

export const Action = styled.button`
  padding: 0;
  margin: 0 4px 0 8px;

  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  color: ${({ theme }) => theme.editor.action};
  font-family: ${({ theme }) => theme.fonts.normal};
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.4px;

  :hover {
    text-decoration: underline;
  }
`
