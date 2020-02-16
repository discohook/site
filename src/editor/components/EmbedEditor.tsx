import { useObserver } from "mobx-react-lite"
import React from "react"
import { ColorInput } from "../../color/components/ColorInput"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import { Embed } from "../../message/classes/Embed"
import { Field } from "../../message/classes/Field"
import { AuthorEditor } from "./AuthorEditor"
import { FlexContainer } from "./Container"
import { FieldEditor } from "./FieldEditor"
import { FooterEditor } from "./FooterEditor"
import { MultiEditor } from "./MultiEditor"

export type EmbedEditorProps = {
  embed: Embed
}

export function EmbedEditor(props: EmbedEditorProps) {
  const { embed } = props

  return useObserver(() => (
    <FlexContainer>
      <InputGroup>
        <InputField
          id={`e${embed.id}.title`}
          value={embed.title}
          onChange={title => {
            embed.title = title || undefined
          }}
          label="Title"
          maxLength={256}
        />
        <InputField
          id={`e${embed.id}.url`}
          value={embed.url}
          onChange={url => {
            embed.url = url || undefined
          }}
          label="URL"
        />
      </InputGroup>
      <InputField
        id={`e${embed.id}.desc`}
        value={embed.description}
        onChange={description => {
          embed.description = description || undefined
        }}
        label="Description"
        type="multiline"
        maxLength={2048}
      />
      <AuthorEditor embed={embed} />
      <FooterEditor embed={embed} />
      <InputGroup>
        <InputField
          id={`e${embed.id}.img`}
          value={embed.image}
          onChange={image => {
            embed.image = image || undefined
          }}
          label="Image"
        />
        <InputField
          id={`e${embed.id}.thumb`}
          value={embed.thumbnail}
          onChange={thumbnail => {
            embed.thumbnail = thumbnail || undefined
          }}
          label="Thumbnail"
        />
        <ColorInput id={`e${embed.id}.color`} color={embed.color} />
      </InputGroup>
      <MultiEditor<Field>
        items={embed.fields}
        name="Field"
        limit={25}
        factory={() => new Field(embed)}
        keyMapper={field => field.id}
      >
        {field => <FieldEditor field={field} />}
      </MultiEditor>
    </FlexContainer>
  ))
}
