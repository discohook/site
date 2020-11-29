import { useObserver } from "mobx-react-lite"
import React from "react"
import { InputField } from "../../../common/input/text/InputField"
import { RowContainer } from "../../../common/layout/RowContainer"
import { Section } from "../../../common/layout/Section"
import { Stack } from "../../../common/layout/Stack"
import type { EmbedItemFormState } from "../../message/state/editorForm"
import type { EmbedLike } from "../../message/state/models/EmbedModel"

export type EmbedAuthorEditorProps = {
  embed: EmbedLike
  form: EmbedItemFormState
}

export function EmbedAuthorEditor(props: EmbedAuthorEditorProps) {
  const { embed, form } = props

  return useObserver(() => (
    <Section name="Author" hasError={!form.group("author").isValid}>
      <Stack gap={12}>
        <InputField
          id={`_${embed.id}_author`}
          label="Author"
          maxLength={256}
          rows={1}
          error={form.field("author").error}
          {...form.field("author").inputProps}
        />
        <RowContainer>
          <InputField
            id={`_${embed.id}_authorUrl`}
            label="Author URL"
            disabled={!embed.author}
            error={form.field("authorUrl").error}
            {...form.field("authorUrl").inputProps}
          />
          <InputField
            id={`_${embed.id}_authorIcon`}
            label="Author Icon URL"
            disabled={!embed.author}
            error={form.field("authorIcon").error}
            {...form.field("authorIcon").inputProps}
          />
        </RowContainer>
      </Stack>
    </Section>
  ))
}
