import { observable } from "mobx"
import { useObserver } from "mobx-react-lite"
import React from "react"
import { FileInput } from "../../form/components/FileInput"
import { InputField } from "../../form/components/InputField"
import { Embed } from "../../message/classes/Embed"
import { Message } from "../../message/classes/Message"
import { getAvatarUrl } from "../../webhook/helpers/getAvatarUrl"
import { Webhook } from "../../webhook/types/Webhook"
import { FlexContainer } from "./Container"
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
      <InputField
        id="message-content"
        value={message.content}
        onChange={content => {
          message.content = content || undefined
        }}
        label="Message content"
        type="multiline"
        maxLength={2000}
      />
      <MultiEditor<Embed>
        items={message.embeds}
        name="Embed"
        limit={10}
        factory={() => new Embed(message)}
        keyMapper={embed => embed.id}
      >
        {embed => <EmbedEditor embed={embed} />}
      </MultiEditor>
      <FlexContainer flow="row">
        <InputField
          id="message-username"
          value={message.username}
          onChange={username => {
            message.username = username || undefined
          }}
          label="Override username"
          placeholder={webhook?.name}
          maxLength={32}
        />
        <InputField
          id="message-avatar"
          value={message.avatar}
          onChange={avatar => {
            message.avatar = avatar || undefined
          }}
          label="Override avatar"
          placeholder={webhook && getAvatarUrl(webhook)}
        />
      </FlexContainer>
      <FileInput
        files={message.files}
        onChange={files => {
          message.files = observable.array([...files])
        }}
      />
    </>
  ))
}
