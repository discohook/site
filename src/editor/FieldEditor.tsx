import styled from "@emotion/styled"
import React from "react"
import { Field } from "../message/Message"
import { id } from "../message/uid"
import InputField from "./InputField"
import { BoxContainer, Container, ToggleButton } from "./styles"

const InlineToggle = styled(ToggleButton)`
  && {
    margin: 28px 8px 8px;
    align-self: flex-start;
  }
`

type Props = {
  id: number
  field: Field
  onChange: (fields: Field) => void
}

export default function FieldEditor(props: Props) {
  const { id: embedId, field, onChange: handleChange } = props

  return (
    <BoxContainer>
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
          label="Field name"
          maxLength={256}
        />
        <InlineToggle
          filled={field.inline || false}
          onClick={() =>
            handleChange({
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
          handleChange({
            ...field,
            value: value || undefined,
          })
        }
        label="Field value"
        type="multiline"
        maxLength={1024}
      />
    </BoxContainer>
  )
}
