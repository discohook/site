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
      <FieldEditor
        fields={props.embed.fields || []}
        onChange={(fields) => props.onChange({ ...props.embed, fields })}
      />
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
