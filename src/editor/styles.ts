import styled from "styled-components"

export const Container = styled.div<{ direction?: "column" | "row" }>`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};
  flex-wrap: ${(props) => (props.direction === "row" ? "wrap" : "nowrap")};

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

  border: 1px solid ${(props) => props.theme.border};
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

export const TextInput = styled.input.attrs((props) => ({
  type: props.type || "text",
}))`
  padding: 10px;
  margin: 8px 0;

  background: ${(props) => props.theme.input};
  border: 0;
  border-radius: 3px;
  outline: none;

  resize: vertical;

  color: ${(props) => props.theme.text};
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;

  textarea& {
    min-height: 60px;
  }
`

export const Button = styled.button`
  min-height: 40px;
  max-height: 40px;
  margin: 8px;
  padding: 0 16px;

  background: transparent;
  border: 1px solid ${(props) => props.theme.accent};
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  color: ${(props) => props.theme.button.enabled};
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;

  transition: background-color 300ms;

  :hover:not(:disabled) {
    background: ${(props) => props.theme.accent};
  }

  :disabled {
    color: ${(props) => props.theme.button.disabled};
    cursor: not-allowed;
  }
`

export const ToggleButton = styled(Button)<{ filled: boolean }>`
  &,
  :hover:not(:disabled) {
    background: ${(props) =>
      props.filled ? props.theme.accent : "transparent"};
    color: ${(props) =>
      props.filled ? props.theme.button.filled : props.theme.button.enabled};
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

  color: ${(props) => props.theme.action};
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  font-weight: 500;
  line-height: 20px;
  letter-spacing: -0.4px;

  :hover {
    text-decoration: underline;
  }
`
