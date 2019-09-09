import styled, { StyledComponent } from "@emotion/styled"
import { Theme } from "../themes"

type SC<Tag extends keyof JSX.IntrinsicElements> = StyledComponent<
  JSX.IntrinsicElements[Tag],
  Omit<JSX.IntrinsicElements[Tag], "ref" | "key">,
  Theme
>

export const Container = styled.div<{ direction?: "column" | "row" }, Theme>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "column"};
  flex-wrap: ${({ direction }) => (direction === "row" ? "wrap" : "nowrap")};

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

export const InputLabel = styled.label`
  display: flex;
  flex-direction: column;
  margin: 4px 8px 0;
`

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
  min-height: 60px;
` as SC<"textarea">

export const InputNote = styled.div<
  { state: "normal" | "warning" | "error" },
  Theme
>`
  align-self: flex-end;
  margin: 0 10px 0 0;

  font-size: 13px;
  font-weight: 500;

  color: ${({ theme, state }) => {
    if (state === "error") return theme.red
    if (state === "warning") return theme.yellow
    if (state === "normal") return theme.text
  }};
`

export const Button = styled.button<{}, Theme>`
  min-height: 32px;
  max-height: 32px;
  margin: 8px;
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

export const ToggleButton = styled(Button)<{ filled: boolean }, Theme>`
  && {
    background: ${({ theme, filled }) =>
      filled ? theme.accent : "transparent"};
    color: ${({ theme, filled }) => theme.header.primary};
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
  margin: 0 4px 0 8px;

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
`
