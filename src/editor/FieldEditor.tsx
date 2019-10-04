import styled from "@emotion/styled"
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

const InlineToggle = styled(ToggleButton)`
  && {
    margin: 28px 8px 8px;
    align-self: flex-start;
  }
`

type Props = {
  id: number
  fields: Field[]
  onChange: (fields: Field[]) => void
}

export default function FieldEditor(props: Props) {
  const { id: embedId } = props
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
            id={`message-embed${embedId}-field${field[id]}-name`}
            value={field.name}
            onChange={name =>
              modifyField(index, {
                ...field,
                name: name || undefined,
              })
            }
            label="Field name"
            maxLength={256}
          />
          <InlineToggle
            filled={field.inline || false}
            onClick={() =>
              modifyField(index, {
                ...field,
                inline: !field.inline || undefined,
              })
            }
          >
            Inline
          </InlineToggle>
        </Container>
        <InputField
          id={`message-embed${embedId}-field${field[id]}-value`}
          value={field.value}
          onChange={value =>
            modifyField(index, {
              ...field,
              value: value || undefined,
            })
          }
          label="Field value"
          multiline
          maxLength={1024}
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
