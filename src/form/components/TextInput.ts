import { rgb } from "polished"
import styled from "styled-components"

export const TextInput = styled.input.attrs(({ type }) => ({
  type: type ?? "text",
}))`
  padding: 6px 8px;
  margin: 8px 0;

  background: ${({ theme }) =>
    theme.appearance.color === "dark" ? rgb(64, 68, 75) : rgb(235, 237, 239)};
  border: none;
  border-radius: 3px;
  outline: none;

  color: ${({ theme }) => theme.text.normal};
  font-size: 15px;
  line-height: 20px;

  &:focus {
    box-shadow: ${({ theme }) => theme.elavation.low};
  }
`
