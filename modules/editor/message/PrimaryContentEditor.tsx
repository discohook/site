import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { FileInputField } from "../../../common/input/file/FileInputField"
import { InputField } from "../../../common/input/text/InputField"
import { RowContainer } from "../../../common/layout/RowContainer"
import { Stack } from "../../../common/layout/Stack"
import { Markdown } from "../../markdown/Markdown"
import type { MessageItemFormState } from "../../message/state/editorForm"
import type { MessageLike } from "../../message/state/models/MessageModel"

const Message = styled(Markdown)`
  margin-bottom: -10px;
`

export type PrimaryContentEditorProps = {
  message: MessageLike
  form: MessageItemFormState
}

export function PrimaryContentEditor(props: PrimaryContentEditorProps) {
  const { message, form } = props

  return useObserver(() => (
    <Stack gap={12}>
      <InputField
        id={`_${message.id}_content`}
        label="Content"
        maxLength={2000}
        rows={4}
        error={form.field("content").error}
        {...form.field("content").inputProps}
      />
      {message.reference ? (
        <Message content="*You cannot edit username, avatar and files for previously sent messages.*" />
      ) : (
        <>
          <RowContainer>
            <InputField
              id={`_${message.id}_username`}
              label="Username"
              maxLength={80}
              error={form.field("username").error}
              {...form.field("username").inputProps}
            />
            <InputField
              id={`_${message.id}_avatar`}
              label="Avatar URL"
              error={form.field("avatar").error}
              {...form.field("avatar").inputProps}
            />
          </RowContainer>
          <FileInputField
            id={`_${message.id}_files`}
            label="Files"
            maxSize={8 * 1024 ** 2}
            value={message.files}
            onChange={files => message.set("files", files)}
          />
        </>
      )}
    </Stack>
  ))
}
