import { useObserver } from "mobx-react-lite"
import React from "react"
import { ColorInputField } from "../../../common/input/color/ColorInputField"
import { InputField } from "../../../common/input/text/InputField"
import { RowContainer } from "../../../common/layout/RowContainer"
import { Section } from "../../../common/layout/Section"
import { Stack } from "../../../common/layout/Stack"
import type { EmbedItemFormState } from "../../message/state/editorForm"
import type { EmbedLike } from "../../message/state/models/EmbedModel"

export type EmbedBodyEditorProps = {
  embed: EmbedLike
  form: EmbedItemFormState
}

export function EmbedBodyEditor(props: EmbedBodyEditorProps) {
  const { embed, form } = props

  return useObserver(() => (
    <Section name="Body" hasError={!form.group("body").isValid}>
      <Stack gap={12}>
        <InputField
          id={`_${embed.id}_title`}
          label="Title"
          maxLength={256}
          rows={1}
          error={form.field("title").error}
          {...form.field("title").inputProps}
        />
        <InputField
          id={`_${embed.id}_description`}
          label="Description"
          maxLength={2048}
          rows={4}
          error={form.field("description").error}
          {...form.field("description").inputProps}
        />
        <RowContainer>
          <InputField
            id={`_${embed.id}_url`}
            label="URL"
            error={form.field("url").error}
            {...form.field("url").inputProps}
          />
          <ColorInputField
            id={`_${embed.id}_color`}
            label="Color"
            color={embed.color}
          />
        </RowContainer>
      </Stack>
    </Section>
  ))
}
