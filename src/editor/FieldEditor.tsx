import React from "react"
import styled from "styled-components"
import InputField from "../form/InputField"
import Toggle from "../form/Toggle"
import { Field } from "../message/Message"
import { id } from "../message/uid"
import { Container } from "./styles"

const TopRowContainer = styled(Container)`
  & > *:first-of-type {
    flex: 2;
    padding-right: 8px;
  }

  & > *:last-of-type {
    flex: 1;
  }
`

const ToggleContainer = styled.div`
  margin-top: 34px;
  height: 32px;

  && > * {
    padding-left: 0;
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
    <Container>
      <TopRowContainer flow="row">
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
        <ToggleContainer>
          <Toggle
            id={`message-embed${embedId}-field${field[id]}-inline`}
            label="Inline"
            value={field.inline ?? false}
            onChange={inline =>
              handleChange({
                ...field,
                inline: inline || undefined,
              })
            }
          />
        </ToggleContainer>
      </TopRowContainer>
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
