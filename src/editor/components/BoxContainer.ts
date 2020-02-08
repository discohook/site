import styled from "styled-components"

export const BoxContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin: 8px;
  padding: 8px;

  background: ${({ theme }) => theme.background.secondary};
  border-radius: 4px;

  box-shadow: ${({ theme }) => theme.elavation.low};

  & & {
    margin: 0;
    padding: 0;

    box-shadow: none;
  }
`
