import React from "react"
import { Embed } from "../message/embed/Embed"
import { AuthorEditor } from "./AuthorEditor"
import { FieldEditor } from "./FieldEditor"
import { FooterEditor } from "./FooterEditor"
import { InputField } from "./InputField"
import {
  Action,
  ActionsContainer,
  ActionsHeader,
  BoxContainer,
  Button,
  Container,
  InputGroup,
} from "./styles"

interface Props {
  embed: Embed
  embedIndex: number
  embedCount: number
  onChange: (embed: Embed) => void
  onDelete: () => void
  onMoveUp: () => void
  onMoveDown: () => void
}

export const EmbedEditor = (props: Props) => (
  <Container>
    <ActionsContainer>
      <ActionsHeader>Embed {props.embedIndex + 1}</ActionsHeader>
      <Action onClick={props.onDelete}>Delete</Action>
      {props.embedIndex > 0 && (
        <Action onClick={props.onMoveUp}>Move up</Action>
      )}
      {props.embedCount - props.embedIndex > 1 && (
        <Action onClick={props.onMoveDown}>Move down</Action>
      )}
    </ActionsContainer>
    <BoxContainer>
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
      <Button
        fullWidth
        disabled={props.embed.fields ? props.embed.fields.length >= 25 : false}
        onClick={() =>
          props.onChange({
            ...props.embed,
            fields: [...(props.embed.fields || []), {}],
          })
        }
      >
        Add field
      </Button>
      <FooterEditor
        footer={props.embed.footer}
        timestamp={props.embed.timestamp}
        onChange={(partialEmbed) =>
          props.onChange({ ...props.embed, ...partialEmbed })
        }
      />
      <InputGroup>
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
      </InputGroup>
    </BoxContainer>
  </Container>
)
