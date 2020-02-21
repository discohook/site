import { Observer, useObserver } from "mobx-react-lite"
import React from "react"
import { FileInput } from "../../form/components/FileInput"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import { Embed } from "../../message/classes/Embed"
import { Message } from "../../message/classes/Message"
import { getAvatarUrl } from "../../webhook/helpers/getAvatarUrl"
import { Webhook } from "../../webhook/types/Webhook"
import { EmbedEditor } from "./EmbedEditor"
import { MultiEditor } from "./MultiEditor"

export type MessageEditorProps = {
  message: Message
  webhook?: Webhook
}

export function MessageEditor(props: MessageEditorProps) {
  const { message, webhook } = props

  return useObserver(() => (
    <>
      <Observer>
        {() => (
          <InputField
            id="m.content"
            value={message.content}
            onChange={content => {
              message.content = content
            }}
            label="Message content"
            type="multiline"
            maxLength={2000}
          />
        )}
      </Observer>
      <MultiEditor<Embed>
        items={message.embeds}
        name="Embed"
        limit={10}
        factory={() => new Embed(message)}
        keyMapper={embed => embed.id}
      >
        {embed => <EmbedEditor embed={embed} />}
      </MultiEditor>
      <Observer>
        {() => (
          <InputGroup>
            <InputField
              id="m.username"
              value={message.username}
              onChange={username => {
                message.username = username
              }}
              label="Override username"
              placeholder={webhook?.name}
              maxLength={32}
            />
            <InputField
              id="m.avatar"
              value={message.avatar}
              onChange={avatar => {
                message.avatar = avatar
              }}
              label="Override avatar"
              placeholder={webhook && getAvatarUrl(webhook)}
            />
          </InputGroup>
        )}
      </Observer>
      <FileInput
        id="m.files"
        files={message.files}
        onChange={files => {
          message.files = files
        }}
      />
    </>
  ))
}
