import React from "react"
import { ColorInput } from "../../color/components/ColorInput"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import { getUniqueId, id } from "../../message/helpers/getUniqueId"
import { Embed } from "../../message/types/Embed"
import { Field } from "../../message/types/Field"
import { AuthorEditor } from "./AuthorEditor"
import { FlexContainer } from "./Container"
import { FieldEditor } from "./FieldEditor"
import { FooterEditor } from "./FooterEditor"
import { MultiEditor } from "./MultiEditor"

export type EmbedEditorProps = {
  embed: Embed
  onChange: (embeds: Embed) => void
}

export function EmbedEditor(props: EmbedEditorProps) {
  const { embed, onChange: handleChange } = props

  return (
    <FlexContainer>
      <InputGroup>
        <InputField
          id={`message-embed${embed[id]}-title`}
          value={embed.title}
          onChange={title =>
            handleChange({
              ...embed,
              title: title || undefined,
            })
          }
          label="Title"
          maxLength={256}
        />
        <InputField
          id={`message-embed${embed[id]}-url`}
          value={embed.url}
          onChange={url =>
            handleChange({
              ...embed,
              url: url || undefined,
            })
          }
          label="URL"
        />
      </InputGroup>
      <InputField
        id={`message-embed${embed[id]}-description`}
        value={embed.description}
        onChange={description =>
          handleChange({
            ...embed,
            description: description || undefined,
          })
        }
        label="Description"
        type="multiline"
        maxLength={2048}
      />
      <AuthorEditor
        id={embed[id]}
        author={embed.author}
        onChange={author =>
          handleChange({
            ...embed,
            author,
          })
        }
      />
      <FooterEditor
        id={embed[id]}
        footer={embed.footer}
        timestamp={embed.timestamp}
        onChange={partial =>
          handleChange({
            ...embed,
            ...partial,
          })
        }
      />
      <InputGroup>
        <InputField
          id={`message-embed${embed[id]}-image`}
          value={embed.image?.url}
          onChange={url =>
            handleChange({
              ...embed,
              image: url ? { url } : undefined,
            })
          }
          label="Image"
        />
        <InputField
          id={`message-embed${embed[id]}-thumbnail`}
          value={embed.thumbnail?.url}
          onChange={url =>
            handleChange({
              ...embed,
              thumbnail: url ? { url } : undefined,
            })
          }
          label="Thumbnail"
        />
        <ColorInput
          id={`message-embed${embed[id]}-color`}
          color={embed.color}
          onChange={color =>
            handleChange({
              ...embed,
              color,
            })
          }
        />
      </InputGroup>
      <MultiEditor<Field>
        items={embed.fields ?? []}
        onChange={fields =>
          handleChange({
            ...embed,
            fields: fields.length > 0 ? fields : undefined,
          })
        }
        name="Field"
        limit={25}
        factory={() => ({ [id]: getUniqueId() })}
        keyMapper={field => field[id]}
      >
        {(field, onChange) => (
          <FieldEditor id={embed[id]} field={field} onChange={onChange} />
        )}
      </MultiEditor>
    </FlexContainer>
  )
}
