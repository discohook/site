import React from "react"
import { Field } from "../message/Message"
import { getUniqueId, id } from "../uid"
import InputField from "./InputField"
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
  onChange: (fields: Field[]) => void
}

export default function FieldEditor(props: Props) {
  const fields = Array.from(props.fields)

  const addField = () => props.onChange([...fields, { [id]: getUniqueId() }])

  const deleteField = (index: number) =>
    props.onChange([...fields.slice(0, index), ...fields.slice(index + 1)])

  const moveField = (from: number, to: number) => {
    const newFields = [...fields]
    newFields.splice(to, 0, ...newFields.splice(from, 1))
    props.onChange(newFields)
  }

  const modifyField = (index: number, field: Field) =>
    props.onChange([
      ...fields.slice(0, index),
      field,
      ...fields.slice(index + 1),
    ])

  const editors = fields.map((field, index) => (
    <Container key={field[id]}>
      <ActionsContainer>
        <ActionsHeader>Field {index + 1}</ActionsHeader>
        <Action onClick={() => deleteField(index)}>Delete</Action>
        {index > 0 && (
          <Action onClick={() => moveField(index, index - 1)}>Move up</Action>
        )}
        {fields.length - index > 1 && (
          <Action onClick={() => moveField(index, index + 1)}>Move down</Action>
        )}
      </ActionsContainer>
      <BoxContainer>
        <Container direction="row">
          <InputField
            value={field.name}
            onChange={(name) =>
              modifyField(index, {
                ...field,
                name: name || (undefined as any),
              })
            }
            label="Field name"
          />
          <ToggleButton
            filled={field.inline || false}
            onClick={() =>
              modifyField(index, {
                ...field,
                inline: !field.inline || undefined,
              })
            }
          >
            Inline
          </ToggleButton>
        </Container>
        <InputField
          value={field.value}
          onChange={(value) =>
            modifyField(index, {
              ...field,
              value: value || (undefined as any),
            })
          }
          label="Field value"
          multiline
        />
      </BoxContainer>
    </Container>
  ))

  return (
    <Container>
      {editors}
      <Button disabled={fields.length >= 25} onClick={addField}>
        Add field
      </Button>
    </Container>
  )
}
