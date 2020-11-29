import styled from "styled-components"

export const PopoverContainer = styled.div`
  max-width: calc(100vw - 48px);

  padding: 16px;

  background: ${({ theme }) => theme.background.floating};
  border-radius: 4px;

  box-shadow: ${({ theme }) => theme.elavation.high};
`
