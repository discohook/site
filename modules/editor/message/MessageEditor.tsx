import { useObserver } from "mobx-react-lite"
import React from "react"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import { Stack } from "../../../common/layout/Stack"
import type { MessageItemFormState } from "../../message/state/editorForm"
import type { EmbedLike } from "../../message/state/models/EmbedModel"
import type { MessageLike } from "../../message/state/models/MessageModel"
import { EmbedEditor } from "./EmbedEditor"
import { PrimaryContentEditor } from "./PrimaryContentEditor"

export type MessageEditorProps = {
  message: MessageLike
  form: MessageItemFormState
}

export function MessageEditor(props: MessageEditorProps) {
  const { message, form } = props

  return useObserver(() => (
    <Stack gap={16}>
      <PrimaryContentEditor message={message} form={form} />
      {message.embeds.map((embed, index) => (
        <EmbedEditor
          key={embed.id}
          embed={embed}
          form={form.repeatingForm("embeds").index(index)}
        />
      ))}
      <div>
        <PrimaryButton
          disabled={message.size >= 10}
          onClick={() => {
            form.repeatingForm("embeds").push({} as EmbedLike, ["timestamp"])
          }}
        >
          Add Embed
        </PrimaryButton>
      </div>
    </Stack>
  ))
}
