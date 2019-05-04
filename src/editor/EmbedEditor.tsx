import React from "react"
import styled from "styled-components"
import { Embed } from "../message/embed/Embed"
import { AuthorEditor } from "./AuthorEditor"
import { FieldEditor } from "./FieldEditor"
import { FooterEditor } from "./FooterEditor"
import { InputField } from "./InputField"

interface Props {
  embed: Embed
  onChange: (embed: Embed) => void
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  margin: 8px;
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
    {(props.embed.fields || []).map((field, index) => (
      <FieldEditor
        key={index}
        field={field}
        onChange={(field) => {
          const fields = Array.from(props.embed.fields || [])
          fields[index] = field
          props.onChange({ ...props.embed, fields })
        }}
      />
    ))}
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
  </Container>
)
