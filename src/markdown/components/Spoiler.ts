import { transparentize } from "polished"
import styled from "styled-components"

export const Spoiler = styled.span`
  background: ${({ theme }) =>
    transparentize(0.9, theme.appearance.color === "dark" ? "white" : "black")};
  border-radius: 3px;
`
