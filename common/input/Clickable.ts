import styled from "styled-components"

export const Clickable = styled.button.attrs(props => ({
  type: "type" in props ? props.type : "button",
}))`
  display: block;

  margin: 0;
  padding: 0;
  border: none;
  background: none;
  outline: none;
  color: inherit;
  font: inherit;

  cursor: pointer;

  &:disabled {
    cursor: default;
  }
`
