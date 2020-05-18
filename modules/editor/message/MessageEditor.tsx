import { Observer, useObserver } from "mobx-react-lite"
import React from "react"
import { FileInput } from "../../../common/input/file/FileInput"
import { InputField } from "../../../common/input/InputField"
import { InputGroup } from "../../../common/input/styles/InputGroup"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { Embed } from "../../message/Embed"
import { EditorManagerContext } from "../EditorManagerContext"
import { MultiEditor } from "../MultiEditor"
import { EmbedEditor } from "./EmbedEditor"

export function MessageEditor() {
  const editorManager = useRequiredContext(EditorManagerContext)

  return useObserver(() => (
    <>
      <Observer>
        {() => (
          <InputField
            id={`message-${editorManager.message.id}-content`}
            value={editorManager.message.content}
            onChange={content => {
              editorManager.message.content = content
            }}
            label="Message content"
            type="multiline"
            maxLength={2000}
          />
        )}
      </Observer>
      <Observer>
        {() => (
          <MultiEditor<Embed>
            items={editorManager.message.embeds}
            name="Embed"
            limit={editorManager.message.embedLimit}
            factory={() => new Embed(editorManager.message)}
            keyMapper={embed => embed.id}
            clone={embed => new Embed(embed.message, embed)}
            canDuplicate={embed => {
              const realEmbeds = editorManager.message.embeds.reduce(
                (total, embed) => total + embed.weight,
                0,
              )

              return realEmbeds + embed.weight <= 10
            }}
          >
            {embed => <EmbedEditor embed={embed} />}
          </MultiEditor>
        )}
      </Observer>
      <Observer>
        {() => (
          <InputGroup>
            <InputField
              id={`message-${editorManager.message.id}-username`}
              value={editorManager.message.username}
              onChange={username => {
                editorManager.message.username = username
              }}
              label="Override username"
              placeholder={editorManager.webhook.name}
              maxLength={80}
            />
            <InputField
              id={`message-${editorManager.message.id}-avatar`}
              value={editorManager.message.avatar}
              onChange={avatar => {
                editorManager.message.avatar = avatar
              }}
              label="Override avatar"
              placeholder={editorManager.webhook.avatarUrl}
              validate={url =>
                /^https?:\/\//.test(url) ? undefined : "Invalid URL"
              }
            />
          </InputGroup>
        )}
      </Observer>
      <FileInput
        id={`message-${editorManager.message.id}-files`}
        files={editorManager.message.files}
        onChange={files => {
          editorManager.message.files = files
        }}
      />
    </>
  ))
}
