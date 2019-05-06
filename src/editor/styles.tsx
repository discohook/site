import styled from "styled-components"

export const Container = styled.div<{ direction?: "column" | "row" }>`
  display: flex;
  flex-direction: ${(props) => props.direction || "column"};

  > * {
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

  border: 1px solid #1e1f23;
  border-radius: 3px;
`

export const InputGroup = styled.div`
  display: flex;

  > * {
    flex-grow: 1;
  }
`

export const InputLabel = styled.span`
  display: inline-block;
  margin: 8px 8px 0;
`

export const TextInput = styled.input.attrs((props) => ({
  type: props.type || "text",
}))`
  min-height: 20px;
  padding: 10px;
  margin: 8px;

  background: #484c52;
  border: 0;
  border-radius: 3px;
  outline: none;

  resize: vertical;

  color: rgba(255, 255, 255, 0.7);
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;
`

export const Button = styled.button<{ fullWidth?: boolean }>`
  min-height: 40px;
  max-height: 40px;
  min-width: ${(props) => (props.fullWidth ? "calc(100% - 16px)" : "80px")};
  max-width: ${(props) => (props.fullWidth ? "calc(100% - 16px)" : "80px")};
  margin: 8px;
  padding: 0 16px;

  background: transparent;
  border: 1px solid #7289da;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  color: #ffffff;
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;

  transition: 300ms;

  :hover:not(:disabled) {
    background: #7289da;
  }

  :disabled {
    color: rgba(255, 255, 255, 0.6);
    cursor: not-allowed;
  }
`

export const ToggleButton = styled(Button)<{ filled: boolean }>`
  &,
  :hover:not(:disabled) {
    background: ${(props) => (props.filled ? "#7289da" : "transparent")};
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
  margin: 0 0 0 12px;

  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  color: #ffffff;
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;

  :hover {
    text-decoration: underline;
  }
`
