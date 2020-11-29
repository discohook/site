import styled from "styled-components"

export const ModalContainer = styled.div`
  width: 500px;
  max-width: calc(100vw - 32px);
  max-height: calc(100vh - 32px);

  background: ${({ theme }) => theme.background.primary};
  border-radius: 4px;
`
