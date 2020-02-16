import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { InputField } from "../../form/components/InputField"
import { Toggle } from "../../form/components/Toggle"
import { Field } from "../../message/classes/Field"
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
  field: Field
}

export function FieldEditor(props: FieldEditorProps) {
  const { field } = props

  return useObserver(() => (
    <FlexContainer>
      <TopRowContainer flow="row">
        <InputField
          id={`f${field.id}.name`}
          value={field.name}
          onChange={name => {
            field.name = name || undefined
          }}
          label="Field Name"
          maxLength={256}
        />
        <ToggleContainer>
          <Toggle
            id={`f${field.id}.inline`}
            label="Inline"
            value={field.inline}
            onChange={inline => {
              field.inline = inline
            }}
          />
        </ToggleContainer>
      </TopRowContainer>
      <InputField
        id={`f${field.id}.value`}
        value={field.value}
        onChange={value => {
          field.value = value || undefined
        }}
        label="Field Value"
        type="multiline"
        maxLength={1024}
      />
    </FlexContainer>
  ))
}
