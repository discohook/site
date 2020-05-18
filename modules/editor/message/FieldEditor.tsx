import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { InputField } from "../../../common/input/InputField"
import { Toggle } from "../../../common/input/Toggle"
import type { Field } from "../../message/Field"
import { FlexContainer } from "../styles/FlexContainer"

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
  field: Field
}

export function FieldEditor(props: FieldEditorProps) {
  const { field } = props

  return useObserver(() => (
    <FlexContainer>
      <TopRowContainer flow="row">
        <InputField
          id={`field-${field.id}-name`}
          value={field.name}
          onChange={name => {
            field.name = name
          }}
          label="Field Name"
          maxLength={256}
        />
        <ToggleContainer>
          <Toggle
            id={`field-${field.id}-inline`}
            label="Inline"
            value={field.inline}
            onChange={inline => {
              field.inline = inline
            }}
          />
        </ToggleContainer>
      </TopRowContainer>
      <InputField
        id={`field-${field.id}-value`}
        value={field.value}
        onChange={value => {
          field.value = value
        }}
        label="Field Value"
        type="multiline"
        maxLength={1024}
      />
    </FlexContainer>
  ))
}
