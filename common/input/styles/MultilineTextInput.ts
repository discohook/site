import styled from "styled-components"
import { TextInput } from "./TextInput"

export const MultilineTextInput = styled(
  TextInput.withComponent("textarea"),
).attrs({ rows: 3 })`
  resize: vertical;
  min-height: 32px;
`
