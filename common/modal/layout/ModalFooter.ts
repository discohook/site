import styled from "styled-components"
import { ButtonRow } from "../../layout/ButtonRow"

export const ModalFooter = styled(ButtonRow)`
  justify-content: end;

  background: ${({ theme }) => theme.background.secondary};
  border-radius: 0 0 4px 4px;

  padding: 16px;
`
