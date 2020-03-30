import styled from "styled-components"

export const BaseModalFooter = styled.div`
  background: ${({ theme }) => theme.background.secondary};
  border-radius: 0 0 5px 5px;

  padding: 20px;

  display: flex;
  justify-content: flex-end;
  align-items: center;
`
