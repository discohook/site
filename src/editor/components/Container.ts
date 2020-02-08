import styled from "styled-components"

export const FlexContainer = styled.div<{ flow?: "column" | "row" }>`
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
