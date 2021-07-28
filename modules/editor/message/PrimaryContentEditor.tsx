import { useObserver } from "mobx-react-lite"
import { applyPatch } from "mobx-state-tree"
import React from "react"
import { InputError } from "../../../common/input/error/InputError"
import { FileInputField } from "../../../common/input/file/FileInputField"
import { InputLabel } from "../../../common/input/layout/InputLabel"
import { InputField } from "../../../common/input/text/InputField"
import { Section } from "../../../common/layout/Section"
import { Stack } from "../../../common/layout/Stack"
import type { MessageItemFormState } from "../../message/state/editorForm"
import { isLocal, isNotLocal } from "../../message/state/models/AttachmentModel"
import type { MessageLike } from "../../message/state/models/MessageModel"

export type PrimaryContentEditorProps = {
  message: MessageLike
  form: MessageItemFormState
}

export function PrimaryContentEditor(props: PrimaryContentEditorProps) {
  const { message, form } = props

  const isEditing = Boolean(message.reference)

  return useObserver(() => {
    const attachments = message.attachments.filter(isNotLocal)
    const localFiles = message.attachments.filter(isLocal)
    return (
      <Stack gap={12}>
        <InputField
          id={`_${message.id}_content`}
          label="Content"
          maxLength={2000}
          rows={4}
          error={form.field("content").error}
          {...form.field("content").inputProps}
        />
        <Section name="Profile">
          <Stack gap={12}>
            <InputField
              id={`_${message.id}_username`}
              label="Username"
              maxLength={80}
              error={form.field("username").error}
              {...form.field("username").inputProps}
              disabled={isEditing}
            />
            <InputField
              id={`_${message.id}_avatar`}
              label="Avatar URL"
              error={form.field("avatar").error}
              {...form.field("avatar").inputProps}
              disabled={isEditing}
            />
            <InputError
              variant="warning"
              error={
                isEditing
                  ? "You cannot edit the username and avatar for previously sent messages"
                  : undefined
              }
            />
          </Stack>
        </Section>
        {attachments.length > 0 && (
          <Stack gap={12}>
            <InputLabel>Attachments</InputLabel>
            {attachments.map((a, i) => (
              <button onClick={() => {
                applyPatch(form.state.value, [
                  {
                    op: "remove",
                    path: `${form.path}/attachments/${i}`,
                  }
                ])
              }} key={a.id}>Remove {a.filename}</button>
            ))}
          </Stack>
        )}
        <FileInputField
          id={`_${message.id}_files`}
          label="Files"
          maxSize={8 * 1024 ** 2}
          value={localFiles}
          onChange={files => message.setFiles(files)}
        />
      </Stack>
    )
  })
}
