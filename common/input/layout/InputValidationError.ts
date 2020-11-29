import styled from "styled-components"
import { Icon } from "../../layout/Icon"

export const InputValidationError = styled.div`
  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.accent.danger};
  font-size: 16px;
  font-weight: 500;

  padding-top: 8px;

  & > ${Icon} {
    margin-left: -8px;
    color: ${({ theme }) => theme.accent.danger};
  }
`
