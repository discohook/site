import { cover, size } from "polished"
import styled from "styled-components"

export const CheckableInput = styled.input`
  ${cover()};
  ${size("calc(100% + 16px)")};

  padding: 8px;
  margin: -8px;
  border: none;
  outline: none;

  opacity: 0;

  &:not(:disabled) {
    cursor: pointer;
  }
`
