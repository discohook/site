import React from "react"
import styled from "styled-components"
import { InputField } from "../../form/components/InputField"
import { Toggle } from "../../form/components/Toggle"
import { ID } from "../../message/constants/id"
import { Field } from "../../message/types/Field"
import { FlexContainer } from "./Container"

const TopRowContainer = styled(FlexContainer)`
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

export type FieldEditorProps = {
  id: number
  field: Field
  onChange: (fields: Field) => void
}

export function FieldEditor(props: FieldEditorProps) {
  const { id: embedId, field, onChange: handleChange } = props

  return (
    <FlexContainer>
      <TopRowContainer flow="row">
        <InputField
          id={`message-embed${embedId}-field${field[ID]}-name`}
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
            id={`message-embed${embedId}-field${field[ID]}-inline`}
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
        id={`message-embed${embedId}-field${field[ID]}-value`}
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
    </FlexContainer>
  )
}
