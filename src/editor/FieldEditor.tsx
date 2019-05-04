import React from "react"
import styled from "styled-components"
import { Field } from "../message/embed/Field"
import { InputField } from "./InputField"

interface Props {
  field: Field
  onChange: (field: Field) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 8px;
  padding: 8px;

  border: 1px solid #1e1f23;
  border-radius: 3px;
`

export const FieldEditor = (props: Props) => (
  <Container>
    <InputField
      value={props.field.name || ""}
      onChange={(name) => props.onChange({ ...props.field, name })}
      label="Field name"
    />
    <InputField
      value={props.field.value || ""}
      onChange={(value) => props.onChange({ ...props.field, value })}
      label="Field value"
      multiline
    />
  </Container>
)
