import styled from "@emotion/styled"
import { Theme } from "../appearance/Theme"

export const Container = styled.div<{ flow?: "column" | "row" }, Theme>`
  display: flex;
  flex-direction: ${({ flow }) => flow ?? "column"};
  flex-wrap: ${({ flow }) => (flow === "row" ? "wrap" : "nowrap")};

  & > *:not(button) {
    flex-grow: 1;
  }

  & > button {
    align-self: flex-end;
  }
`

export const BoxContainer = styled.div<{}, Theme>`
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

export const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;

  & > * {
    flex-grow: 1;
  }
`
