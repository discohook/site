import { Observer, useObserver } from "mobx-react-lite"
import React from "react"
import { FileInput } from "../../form/components/FileInput"
import { InputField } from "../../form/components/InputField"
import { InputGroup } from "../../form/components/InputGroup"
import { Embed } from "../../message/classes/Embed"
import { useStores } from "../../state/hooks/useStores"
import { EmbedEditor } from "./EmbedEditor"
import { MultiEditor } from "./MultiEditor"

export function MessageEditor() {
  const { messageStore, webhookStore } = useStores()

  return useObserver(() => (
    <>
      <Observer>
        {() => (
          <InputField
            id="m.content"
            value={messageStore.message.content}
            onChange={content => {
              messageStore.message.content = content
            }}
            label="Message content"
            type="multiline"
            maxLength={2000}
          />
        )}
      </Observer>
      <MultiEditor<Embed>
        items={messageStore.message.embeds}
        name="Embed"
        limit={10}
        factory={() => new Embed(messageStore.message)}
        keyMapper={embed => embed.id}
        duplicate={embed => {
          const { message } = messageStore
          const embedIndex = message.embeds.indexOf(embed)
          const embedData = message.getMessageData().embeds?.[embedIndex]

          return new Embed(message, embedData)
        }}
      >
        {embed => <EmbedEditor embed={embed} />}
      </MultiEditor>
      <Observer>
        {() => (
          <InputGroup>
            <InputField
              id="m.username"
              value={messageStore.message.username}
              onChange={username => {
                messageStore.message.username = username
              }}
              label="Override username"
              placeholder={webhookStore?.name}
              maxLength={32}
            />
            <InputField
              id="m.avatar"
              value={messageStore.message.avatar}
              onChange={avatar => {
                messageStore.message.avatar = avatar
              }}
              label="Override avatar"
              placeholder={webhookStore.avatarUrl}
              validate={url =>
                /^https?:\/\//.test(url) ? undefined : "Invalid URL"
              }
            />
          </InputGroup>
        )}
      </Observer>
      <FileInput
        id="m.files"
        files={messageStore.message.files}
        onChange={files => {
          messageStore.message.files = files
        }}
      />
    </>
  ))
}
