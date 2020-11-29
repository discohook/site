import { useObserver } from "mobx-react-lite"
import React from "react"
import { InputField } from "../../../common/input/text/InputField"
import { TimestampInputField } from "../../../common/input/timestamp/TimestampInputField"
import { RowContainer } from "../../../common/layout/RowContainer"
import { Section } from "../../../common/layout/Section"
import { Stack } from "../../../common/layout/Stack"
import type { EmbedItemFormState } from "../../message/state/editorForm"
import type { EmbedLike } from "../../message/state/models/EmbedModel"

export type EmbedFooterEditorProps = {
  embed: EmbedLike
  form: EmbedItemFormState
}

export function EmbedFooterEditor(props: EmbedFooterEditorProps) {
  const { embed, form } = props

  return useObserver(() => (
    <Section name="Footer" hasError={!form.group("footer").isValid}>
      <Stack gap={12}>
        <InputField
          id={`_${embed.id}_footer`}
          label="Footer"
          maxLength={256}
          rows={1}
          error={form.field("footer").error}
          {...form.field("footer").inputProps}
        />
        <RowContainer>
          <TimestampInputField
            id={`_${embed.id}_timestamp`}
            label="Timestamp"
            {...form.field("timestamp").inputProps}
          />
          <InputField
            id={`_${embed.id}_footerIcon`}
            label="Footer Icon URL"
            disabled={!embed.footer}
            error={form.field("footerIcon").error}
            {...form.field("footerIcon").inputProps}
          />
        </RowContainer>
      </Stack>
    </Section>
  ))
}
