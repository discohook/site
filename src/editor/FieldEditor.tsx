import React from "react"
import { Field } from "../message/embed/Field"
import { InputField } from "./InputField"
import {
  Action,
  ActionsContainer,
  ActionsHeader,
  BoxContainer,
  Button,
  Container,
  ToggleButton,
} from "./styles"

interface Props {
  fields: Field[]
  onChange: (fields: Field[] | undefined) => void
}

export const FieldEditor = (props: Props) => {
  const addField = () => {
    const newFields = Array.from(props.fields)
    newFields.push({})
    props.onChange(newFields)
  }

  const modifyField = (index: number, partialField: Partial<Field>) => {
    const newFields = Array.from(props.fields)
    newFields[index] = { ...newFields[index], ...partialField }
    props.onChange(newFields)
  }

  const deleteField = (index: number) => {
    const newFields = Array.from(props.fields)
    newFields.splice(index, 1)
    props.onChange(newFields.length === 0 ? undefined : newFields)
  }

  const moveField = (from: number, to: number) => {
    const newFields = Array.from(props.fields)
    newFields.splice(to, 0, ...newFields.splice(from, 1))
    props.onChange(newFields)
  }

  const editors = (props.fields || []).map((field, index) => (
    <Container key={index}>
      <ActionsContainer>
        <ActionsHeader>Field {index + 1}</ActionsHeader>
        <Action onClick={() => deleteField(index)}>Delete</Action>
        {index > 0 && (
          <Action onClick={() => moveField(index, index - 1)}>Move up</Action>
        )}
        {props.fields.length - index > 1 && (
          <Action onClick={() => moveField(index, index + 1)}>Move down</Action>
        )}
      </ActionsContainer>
      <BoxContainer>
        <Container direction="row">
          <InputField
            value={field.name || ""}
            onChange={(name) => modifyField(index, { name })}
            label="Field name"
          />
          <ToggleButton
            filled={field.inline || false}
            onClick={() =>
              modifyField(index, { inline: !field.inline || undefined })
            }
          >
            Inline
          </ToggleButton>
        </Container>
        <InputField
          value={field.value || ""}
          onChange={(value) => modifyField(index, { value })}
          label="Field value"
          multiline
        />
      </BoxContainer>
    </Container>
  ))

  return (
    <Container>
      {editors}
      <Button fullWidth disabled={props.fields.length >= 25} onClick={addField}>
        Add field
      </Button>
    </Container>
  )
}
