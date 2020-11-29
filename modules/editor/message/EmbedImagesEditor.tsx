import { useObserver } from "mobx-react-lite"
import React from "react"
import styled from "styled-components"
import { ListInputField } from "../../../common/input/list/ListInputField"
import { InputField } from "../../../common/input/text/InputField"
import { RowContainer } from "../../../common/layout/RowContainer"
import { Section } from "../../../common/layout/Section"
import { Stack } from "../../../common/layout/Stack"
import { Markdown } from "../../markdown/Markdown"
import type { EmbedItemFormState } from "../../message/state/editorForm"
import type { EmbedLike } from "../../message/state/models/EmbedModel"

const Message = styled(Markdown)`
  margin-top: -8px;
  font-size: 15px;
`

export type EmbedImagesEditorProps = {
  embed: EmbedLike
  form: EmbedItemFormState
}

export function EmbedImagesEditor(props: EmbedImagesEditorProps) {
  const { embed, form } = props

  return useObserver(() => (
    <Section name="Images" hasError={!form.group("images").isValid}>
      <Stack gap={12}>
        <ListInputField
          id={`_${embed.id}_gallery`}
          label={{ singular: "Image", plural: "Image URLs" }}
          limit={embed.url ? 4 : 1}
          error={form.field("gallery").error}
          {...form.field("gallery").inputProps}
        />
        <Message
          content={
            "*Adding up to 4 images is possible when the URL in the Body " +
            "section is set.*"
          }
        />
        <RowContainer>
          <InputField
            id={`_${embed.id}_thumbnail`}
            label="Thumbnail URL"
            error={form.field("thumbnail").error}
            {...form.field("thumbnail").inputProps}
          />
        </RowContainer>
      </Stack>
    </Section>
  ))
}
