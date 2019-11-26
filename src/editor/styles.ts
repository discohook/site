import styled from "@emotion/styled"
import { Theme } from "../core/themes"

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

export const ActionsContainer = styled.div`
  display: flex;
  margin: 8px;
`

export const ActionsHeader = styled.span<{}, Theme>`
  flex: 1;

  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
`

export const Action = styled.button<{}, Theme>`
  padding: 0;

  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;

  &:hover {
    text-decoration: underline;
  }

  * + & {
    margin-left: 16px;
  }
`
Action.defaultProps = { type: "button" }
