import React from "react"
import { Embed } from "../message/Message"
import { getUniqueId, id } from "../uid"
import AuthorEditor from "./AuthorEditor"
import ColorInput from "./ColorInput"
import FieldEditor from "./FieldEditor"
import FooterEditor from "./FooterEditor"
import InputField from "./InputField"
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
  embeds: Embed[]
  onChange: (embeds: Embed[]) => void
}

export default function EmbedEditor(props: Props) {
  const embeds = Array.isArray(props.embeds) ? props.embeds : []

  const addEmbed = () => props.onChange([...embeds, { [id]: getUniqueId() }])

  const deleteEmbed = (index: number) =>
    props.onChange([...embeds.slice(0, index), ...embeds.slice(index + 1)])

  const moveEmbed = (from: number, to: number) => {
    const newEmbeds = [...embeds]
    newEmbeds.splice(to, 0, ...newEmbeds.splice(from, 1))
    props.onChange(newEmbeds)
  }

  const modifyEmbed = (index: number, embed: Embed) =>
    props.onChange([
      ...embeds.slice(0, index),
      embed,
      ...embeds.slice(index + 1),
    ])

  const editors = embeds.map((embed, index) => (
    <Container key={embed[id]}>
      <ActionsContainer>
        <ActionsHeader>Embed {index + 1}</ActionsHeader>
        <Action onClick={() => deleteEmbed(index)}>Delete</Action>
        {index > 0 && (
          <Action onClick={() => moveEmbed(index, index - 1)}>Move up</Action>
        )}
        {embeds.length - index > 1 && (
          <Action onClick={() => moveEmbed(index, index + 1)}>Move down</Action>
        )}
      </ActionsContainer>
      <BoxContainer>
        <InputGroup>
          <InputField
            value={embed.title}
            onChange={title =>
              modifyEmbed(index, {
                ...embed,
                title: title || undefined,
              })
            }
            label="Title"
            maxLength={256}
          />
          <InputField
            value={embed.url}
            onChange={url =>
              modifyEmbed(index, {
                ...embed,
                url: url || undefined,
              })
            }
            label="Title link"
          />
        </InputGroup>
        <InputField
          value={embed.description}
          onChange={description =>
            modifyEmbed(index, {
              ...embed,
              description: description || undefined,
            })
          }
          label="Description"
          multiline
          maxLength={2048}
        />
        <AuthorEditor
          author={embed.author}
          onChange={author =>
            modifyEmbed(index, {
              ...embed,
              author,
            })
          }
        />
        <FieldEditor
          fields={embed.fields || []}
          onChange={fields =>
            modifyEmbed(index, {
              ...embed,
              fields: fields.length > 0 ? fields : undefined,
            })
          }
        />
        <FooterEditor
          footer={embed.footer}
          timestamp={embed.timestamp}
          onChange={partial =>
            modifyEmbed(index, {
              ...embed,
              ...partial,
            })
          }
        />
        <InputGroup>
          <InputField
            value={(embed.image || {}).url}
            onChange={url =>
              modifyEmbed(index, {
                ...embed,
                image: url ? { url } : undefined,
              })
            }
            label="Image"
          />
          <InputField
            value={(embed.thumbnail || {}).url}
            onChange={url =>
              modifyEmbed(index, {
                ...embed,
                thumbnail: url ? { url } : undefined,
              })
            }
            label="Thumbnail"
          />
          <ColorInput
            value={embed.color}
            onChange={color =>
              modifyEmbed(index, {
                ...embed,
                color,
              })
            }
          />
        </InputGroup>
      </BoxContainer>
    </Container>
  ))

  return (
    <Container>
      {editors}
      <Button disabled={embeds.length >= 10} onClick={addEmbed}>
        Add embed
      </Button>
    </Container>
  )
}
