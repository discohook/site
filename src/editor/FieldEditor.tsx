import React from "react"
import styled from "styled-components"
import { Field } from "../message/embed/Field"
import { InputField } from "./InputField"

interface Props {
  field: Field
  fieldIndex: number
  fieldCount: number
  onChange: (field: Field) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

const Container = styled.div`
  margin: 8px;
`

const ActionsContainer = styled.div`
  display: flex;
  margin: 0 0 4px;
`

const FieldName = styled.span`
  flex: 1;
`

const Action = styled.button`
  padding: 0;
  margin: 0 0 0 12px;

  background: none;
  border: none;
  outline: none;
  cursor: pointer;

  color: #ffffff;
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;

  :hover {
    text-decoration: underline;
  }
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 8px;

  border: 1px solid #1e1f23;
  border-radius: 3px;
`

const InlineButton = styled.button<{ inline: boolean }>`
  width: 80px;
  margin: 8px 8px 8px 4px;
  padding: 0 16px;
  height: 40px;

  background: ${(props) => (props.inline ? "#7289da" : "transparent")};
  border: 1px solid #7289da;
  border-radius: 3px;
  outline: none;
  cursor: pointer;

  color: #ffffff;
  font-family: "Whitney", "Helvetica Neue", "Helvetica", "Arial", sans-serif;
  font-size: 15px;
  line-height: 20px;
  letter-spacing: -0.4px;

  transition: 300ms;

  :hover {
    opacity: 0.8;
  }
`

const HorizontalContainer = styled.div`
  display: flex;
  align-items: flex-end;

  > *:not(${InlineButton}) {
    flex: 1;
  }
`

export const FieldEditor = (props: Props) => (
  <Container>
    <ActionsContainer>
      <FieldName>Field {props.fieldIndex + 1}</FieldName>
      <Action onClick={props.onDelete}>Delete</Action>
      {props.fieldIndex > 0 && (
        <Action onClick={props.onMoveUp}>Move up</Action>
      )}
      {props.fieldCount - props.fieldIndex > 1 && (
        <Action onClick={props.onMoveDown}>Move down</Action>
      )}
    </ActionsContainer>
    <InnerContainer>
      <HorizontalContainer>
        <InputField
          value={props.field.name || ""}
          onChange={(name) => props.onChange({ ...props.field, name })}
          label="Field name"
        />
        <InlineButton
          inline={props.field.inline || false}
          onClick={() =>
            props.onChange({
              ...props.field,
              inline: !props.field.inline || undefined,
            })
          }
        >
          Inline
        </InlineButton>
      </HorizontalContainer>
      <InputField
        value={props.field.value || ""}
        onChange={(value) => props.onChange({ ...props.field, value })}
        label="Field value"
        multiline
      />
    </InnerContainer>
  </Container>
)
