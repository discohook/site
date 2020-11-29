import styled from "styled-components"
import { Button } from "../button/Button"

export const InputContainer = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;

  & ${Button} {
    margin-left: 8px;
  }
`
