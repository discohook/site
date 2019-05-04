import React from "react"
import styled from "styled-components"
import { Embed } from "../message/embed/Embed"
import { AuthorEditor } from "./AuthorEditor"
import { FieldEditor } from "./FieldEditor"
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
    <HorizontalContainer>
      <InputField
        value={(props.embed.footer || {}).text || ""}
        onChange={(text) =>
          props.onChange({
            ...props.embed,
            footer: { ...props.embed.footer, text },
          })
        }
        label="Embed footer text"
      />
      <InputField
        value={props.embed.timestamp || ""}
        onChange={(timestamp) => props.onChange({ ...props.embed, timestamp })}
        label="Embed footer timestamp"
      />
      <InputField
        value={(props.embed.footer || {}).iconUrl || ""}
        onChange={(iconUrl) =>
          props.onChange({
            ...props.embed,
            footer: { ...props.embed.footer, iconUrl },
          })
        }
        label="Embed footer icon"
      />
    </HorizontalContainer>
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
