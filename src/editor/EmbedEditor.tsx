import React from "react"
import styled from "styled-components"
import { Embed } from "../message/embed/Embed"
import { AuthorEditor } from "./AuthorEditor"
import { FieldEditor } from "./FieldEditor"
import { FooterEditor } from "./FooterEditor"
import { InputField } from "./InputField"

interface Props {
  embed: Embed
  embedIndex: number
  embedCount: number
  onChange: (embed: Embed) => void
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

const EmbedName = styled.span`
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

const AddFieldButton = styled.button`
  min-height: 40px;
  margin: 8px;
  padding: 0 16px;

  background: transparent;
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

  :hover:not(:disabled) {
    background: #7289da;
  }

  :disabled {
    color: rgba(255, 255, 255, 0.6);
    cursor: not-allowed;
  }
`

const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;

  padding: 8px;

  border: 1px solid #1e1f23;
  border-radius: 3px;
`

const HorizontalContainer = styled.div`
  display: flex;

  > * {
    flex-grow: 1;
  }
`

export const EmbedEditor = (props: Props) => (
  <Container>
    <ActionsContainer>
      <EmbedName>Embed {props.embedIndex + 1}</EmbedName>
      <Action onClick={props.onDelete}>Delete</Action>
      {props.embedIndex > 0 && (
        <Action onClick={props.onMoveUp}>Move up</Action>
      )}
      {props.embedCount - props.embedIndex > 1 && (
        <Action onClick={props.onMoveDown}>Move down</Action>
      )}
    </ActionsContainer>
    <InnerContainer>
      <InputField
        value={props.embed.title || ""}
        onChange={(title) => props.onChange({ ...props.embed, title })}
        label="Embed title"
      />
      <InputField
        value={props.embed.description || ""}
        onChange={(description) =>
          props.onChange({ ...props.embed, description })
        }
        label="Embed description"
        multiline
      />
      <AuthorEditor
        author={props.embed.author}
        onChange={(author) => props.onChange({ ...props.embed, author })}
      />
      {(props.embed.fields || []).map((field, index, fields) => (
        <FieldEditor
          key={index}
          field={field}
          fieldIndex={index}
          fieldCount={fields.length}
          onChange={(field) => {
            const fields = Array.from(props.embed.fields || [])
            fields[index] = field
            props.onChange({ ...props.embed, fields })
          }}
          onDelete={() => {
            const newFields = Array.from(fields)
            newFields.splice(index, 1)
            props.onChange({
              ...props.embed,
              fields: newFields.length === 0 ? undefined : newFields,
            })
          }}
          onMoveUp={() => {
            const newFields = Array.from(fields)
            newFields.splice(index - 1, 0, ...newFields.splice(index, 1))
            props.onChange({ ...props.embed, fields: newFields })
          }}
          onMoveDown={() => {
            const newFields = Array.from(fields)
            newFields.splice(index + 1, 0, ...newFields.splice(index, 1))
            props.onChange({ ...props.embed, fields: newFields })
          }}
        />
      ))}
      <AddFieldButton
        disabled={props.embed.fields ? props.embed.fields.length >= 25 : false}
        onClick={() =>
          props.onChange({
            ...props.embed,
            fields: [...(props.embed.fields || []), {}],
          })
        }
      >
        Add field
      </AddFieldButton>
      <FooterEditor
        footer={props.embed.footer}
        timestamp={props.embed.timestamp}
        onChange={(partialEmbed) =>
          props.onChange({ ...props.embed, ...partialEmbed })
        }
      />
      <HorizontalContainer>
        <InputField
          value={(props.embed.image || {}).url || ""}
          onChange={(url) =>
            props.onChange({
              ...props.embed,
              image: url ? { url } : undefined,
            })
          }
          label="Embed image"
        />
        <InputField
          value={(props.embed.thumbnail || {}).url || ""}
          onChange={(url) =>
            props.onChange({
              ...props.embed,
              thumbnail: url ? { url } : undefined,
            })
          }
          label="Embed thumbnail"
        />
      </HorizontalContainer>
    </InnerContainer>
  </Container>
)
