import React from "react"
import { FileInput } from "../../form/components/FileInput"
import { InputField } from "../../form/components/InputField"
import { getUniqueId, id } from "../../message/helpers/getUniqueId"
import { Embed } from "../../message/types/Embed"
import { FileLike } from "../../message/types/FileLike"
import { Message } from "../../message/types/Message"
import { getAvatarUrl } from "../../webhook/helpers/getAvatarUrl"
import { Webhook } from "../../webhook/types/Webhook"
import { FlexContainer } from "./Container"
import { EmbedEditor } from "./EmbedEditor"
import { MultiEditor } from "./MultiEditor"

export type MessageEditorProps = {
  message: Message
  onChange: (message: Message) => void
  files: readonly (File | FileLike)[]
  onFilesChange: (files: readonly (File | FileLike)[]) => void
  webhook?: Webhook
}

export function MessageEditor(props: MessageEditorProps) {
  const {
    message,
    onChange: handleChange,
    files,
    onFilesChange: handleFilesChange,
    webhook,
  } = props

  return (
    <>
      <InputField
        id="message-content"
        value={message.content}
        onChange={content =>
          handleChange({
            ...message,
            content: content || undefined,
          })
        }
        label="Message content"
        type="multiline"
        maxLength={2000}
      />
      <MultiEditor<Embed>
        items={message.embeds ?? []}
        onChange={embeds =>
          handleChange({
            ...message,
            embeds: embeds.length > 0 ? embeds : undefined,
          })
        }
        name="Embed"
        limit={10}
        factory={() => ({ [id]: getUniqueId() })}
        keyMapper={embed => embed[id]}
      >
        {(embed, onChange) => <EmbedEditor embed={embed} onChange={onChange} />}
      </MultiEditor>
      <FlexContainer flow="row">
        <InputField
          id="message-username"
          value={message.username}
          onChange={username =>
            handleChange({
              ...message,
              username: username || undefined,
            })
          }
          label="Override username"
          placeholder={webhook?.name}
          maxLength={32}
        />
        <InputField
          id="message-avatar"
          value={message.avatarUrl}
          onChange={avatarUrl =>
            handleChange({
              ...message,
              avatarUrl: avatarUrl || undefined,
            })
          }
          label="Override avatar"
          placeholder={webhook && getAvatarUrl(webhook)}
        />
      </FlexContainer>
      <FileInput files={files} onChange={handleFilesChange} />
    </>
  )
}
