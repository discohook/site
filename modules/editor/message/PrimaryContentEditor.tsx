import { useObserver } from "mobx-react-lite"
import React from "react"
import { Checkbox } from "../../../common/input/checkable/Checkbox"
import { InputError } from "../../../common/input/error/InputError"
import { FileInputField } from "../../../common/input/file/FileInputField"
import { InputField } from "../../../common/input/text/InputField"
import { Section } from "../../../common/layout/Section"
import { Stack } from "../../../common/layout/Stack"
import type { MessageItemFormState } from "../../message/state/editorForm"
import type { MessageLike } from "../../message/state/models/MessageModel"

export type PrimaryContentEditorProps = {
  message: MessageLike
  form: MessageItemFormState
}

export function PrimaryContentEditor(props: PrimaryContentEditorProps) {
  const { message, form } = props

  const isEditing = Boolean(message.reference)

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
      <Section name="Thread">
        <Stack gap={12}>
          <InputField
            id={`_${message.id}_thread_name`}
            label="Forum Thread Name"
            maxLength={100}
            error={form.field("thread_name").error}
            {...form.field("thread_name").inputProps}
            disabled={isEditing}
          />
          <InputError
            variant="warning"
            error={
              isEditing
                ? "You cannot change thread names using webhooks"
                : undefined
            }
          />
        </Stack>
      </Section>
      <Section name="Flags">
        <Stack gap={12}>
          <Checkbox
            id={`_${message.id}_suppress_embeds`}
            label="Suppress Embeds"
            description='Hides link embeds. This cannot be used in conjunction with rich embeds (created with "Add Embed").'
            error={form.field("flags_suppress_embeds").error}
            {...form.field("flags_suppress_embeds").inputProps}
          />
          <Checkbox
            id={`_${message.id}_suppress_notifications`}
            label="Suppress Notifications"
            description='If the message contains mentions in its "Content" field, this prevents Discord from sending out notifications when it is sent.'
            error={form.field("flags_suppress_notifications").error}
            {...form.field("flags_suppress_notifications").inputProps}
          />
        </Stack>
      </Section>
      <FileInputField
        id={`_${message.id}_files`}
        label="Files"
        maxSize={25 * 1024 ** 2}
        value={message.files}
        onChange={files => message.set("files", files)}
      />
    </Stack>
  ))
}
