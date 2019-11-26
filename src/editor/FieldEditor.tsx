import styled from "@emotion/styled"
import React from "react"
import InputField from "../form/InputField"
import { ToggleButton } from "../form/styles"
import { Field } from "../message/Message"
import { id } from "../message/uid"
import { Container } from "./styles"

const InlineToggle = styled(ToggleButton)`
  min-width: 100px;
  margin: 34px 8px 8px;
  align-self: flex-start;
`

type Props = {
  id: number
  field: Field
  onChange: (fields: Field) => void
}

export default function FieldEditor(props: Props) {
  const { id: embedId, field, onChange: handleChange } = props

  return (
    <Container>
      <Container flow="row">
        <InputField
          id={`message-embed${embedId}-field${field[id]}-name`}
          value={field.name}
          onChange={name =>
            handleChange({
              ...field,
              name: name || undefined,
            })
          }
          label="Field Name"
          maxLength={256}
        />
        <InlineToggle
          filled={field.inline ?? false}
          onClick={() =>
            handleChange({
              ...field,
              inline: !field.inline || undefined,
            })
          }
        >
          Inline ({field.inline ? "On" : "Off"})
        </InlineToggle>
      </Container>
      <InputField
        id={`message-embed${embedId}-field${field[id]}-value`}
        value={field.value}
        onChange={value =>
          handleChange({
            ...field,
            value: value || undefined,
          })
        }
        label="Field Value"
        type="multiline"
        maxLength={1024}
      />
    </Container>
  )
}
