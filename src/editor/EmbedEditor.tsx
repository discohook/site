import React from "react"
import { Embed, Image } from "../message/Message"
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
  onChange: (embeds: Embed[] | undefined) => void
}

export default function EmbedEditor(props: Props) {
  const embeds = Array.isArray(props.embeds) ? props.embeds : []

  const addEmbed = () => props.onChange([...embeds, {}])

  const deleteEmbed = (index: number) =>
    props.onChange([...embeds.slice(0, index), ...embeds.slice(index + 1)])

  const moveEmbed = (from: number, to: number) => {
    const newEmbeds = [...embeds]
    newEmbeds.splice(to, 0, ...newEmbeds.splice(from, 1))
    props.onChange(newEmbeds)
  }

  const modifyEmbed = (index: number, partialEmbed: Partial<Embed>) =>
    props.onChange([
      ...embeds.slice(0, index),
      { ...embeds[index], ...partialEmbed },
      ...embeds.slice(index + 1),
    ])

  const editors = embeds.map((embed, index) => (
    <Container key={index}>
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
            value={embed.title || ""}
            onChange={(title) => modifyEmbed(index, { title })}
            label="Embed title"
          />
          <InputField
            value={embed.url || ""}
            onChange={(url) => modifyEmbed(index, { url })}
            label="Embed title link"
          />
        </InputGroup>
        <InputField
          value={embed.description || ""}
          onChange={(description) => modifyEmbed(index, { description })}
          label="Embed description"
          multiline
        />
        <AuthorEditor
          author={embed.author}
          onChange={(author) => modifyEmbed(index, { author })}
        />
        <FieldEditor
          fields={embed.fields || []}
          onChange={(fields) => modifyEmbed(index, { fields })}
        />
        <FooterEditor
          footer={embed.footer}
          timestamp={embed.timestamp}
          onChange={(partial) => modifyEmbed(index, partial)}
        />
        <InputGroup>
          <InputField
            value={(embed.image || ({} as Image)).url || ""}
            onChange={(url) =>
              modifyEmbed(index, { image: url ? { url } : undefined })
            }
            label="Embed image"
          />
          <InputField
            value={(embed.thumbnail || ({} as Image)).url || ""}
            onChange={(url) =>
              modifyEmbed(index, { thumbnail: url ? { url } : undefined })
            }
            label="Embed thumbnail"
          />
          <ColorInput
            value={embed.color}
            onChange={(color) => modifyEmbed(index, { color })}
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
