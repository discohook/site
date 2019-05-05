import React from "react"
import { Field } from "../message/embed/Field"
import { InputField } from "./InputField"
import {
  Action,
  ActionsContainer,
  ActionsHeader,
  BoxContainer,
  Container,
  ToggleButton,
} from "./styles"

interface Props {
  field: Field
  fieldIndex: number
  fieldCount: number
  onChange: (field: Field) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

export const FieldEditor = (props: Props) => (
  <Container>
    <ActionsContainer>
      <ActionsHeader>Field {props.fieldIndex + 1}</ActionsHeader>
      <Action onClick={props.onDelete}>Delete</Action>
      {props.fieldIndex > 0 && (
        <Action onClick={props.onMoveUp}>Move up</Action>
      )}
      {props.fieldCount - props.fieldIndex > 1 && (
        <Action onClick={props.onMoveDown}>Move down</Action>
      )}
    </ActionsContainer>
    <BoxContainer>
      <Container direction="row">
        <InputField
          value={props.field.name || ""}
          onChange={(name) => props.onChange({ ...props.field, name })}
          label="Field name"
        />
        <ToggleButton
          filled={props.field.inline || false}
          onClick={() =>
            props.onChange({
              ...props.field,
              inline: !props.field.inline || undefined,
            })
          }
        >
          Inline
        </ToggleButton>
      </Container>
      <InputField
        value={props.field.value || ""}
        onChange={(value) => props.onChange({ ...props.field, value })}
        label="Field value"
        multiline
      />
    </BoxContainer>
  </Container>
)
