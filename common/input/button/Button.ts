import styled from "styled-components"
import { Clickable } from "../Clickable"

export const Button = styled(Clickable)`
  display: inline-block;

  min-width: 60px;
  min-height: 36px;
  max-height: 36px;

  padding: 0 14px;
  border: 2px solid transparent;

  border-radius: 3px;

  font-size: 16px;
  font-weight: 500;
  white-space: nowrap;

  transition: 167ms;
  transition-property: background-color, border-color, color;
`
