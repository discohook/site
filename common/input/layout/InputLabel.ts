import styled from "styled-components"

export const InputLabel = styled.div`
  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;

  &:not(:empty) {
    margin-bottom: 4px;
  }
`
