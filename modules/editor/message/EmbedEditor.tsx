import { useObserver } from "mobx-react-lite"
import { applyPatch, getSnapshot } from "mobx-state-tree"
import { FieldAccessor } from "mstform"
import React from "react"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import type { Action } from "../../../common/layout/ActionButtons"
import { Section } from "../../../common/layout/Section"
import { Separator } from "../../../common/layout/Separator"
import { Stack } from "../../../common/layout/Stack"
import { chevron, chevronDown } from "../../../icons/chevron"
import { copy } from "../../../icons/copy"
import { remove } from "../../../icons/remove"
import type {
  EmbedItemFormState,
  RepeatingEmbedItemFormState,
} from "../../message/state/editorForm"
import type { EmbedLike } from "../../message/state/models/EmbedModel"
import type { FieldLike } from "../../message/state/models/FieldModel"
import { EmbedAuthorEditor } from "./EmbedAuthorEditor"
import { EmbedBodyEditor } from "./EmbedBodyEditor"
import { EmbedFieldEditor } from "./EmbedFieldEditor"
import { EmbedFooterEditor } from "./EmbedFooterEditor"
import { EmbedImagesEditor } from "./EmbedImagesEditor"

export type EmbedEditorProps = {
  embed: EmbedLike
  form: EmbedItemFormState
}

export function EmbedEditor(props: EmbedEditorProps) {
  const { embed, form } = props

  const name = useObserver(() => {
    let name = `Embed ${form.index + 1}`
    if (embed.displayName) {
      name += ` — ${embed.displayName}`
    }
    return name
  })

  return useObserver(() => (
    <Section
      name={name}
      variant="large"
      color={embed.color}
      actions={[
        form.index !== 0 && {
          icon: chevron,
          label: "Move up",
          handler: () => {
            applyPatch(form.state.value, [
              {
                op: "remove",
                path: form.path,
              },
              {
                op: "add",
                path: `${form.parent?.path}/${form.index - 1}`,
                value: getSnapshot(embed),
              },
            ])
            const parent = form.parent as RepeatingEmbedItemFormState
            for (const accessor of parent.index(form.index - 1).flatAccessors) {
              if (accessor instanceof FieldAccessor) {
                accessor.setRawFromValue()
              }
            }
          },
        },
        form.index !== embed.message.embeds.length - 1 && {
          icon: chevronDown,
          label: "Move down",
          handler: () => {
            applyPatch(form.state.value, [
              {
                op: "remove",
                path: form.path,
              },
              {
                op: "add",
                path: `${form.parent?.path}/${form.index + 1}`,
                value: getSnapshot(embed),
              },
            ])
            const parent = form.parent as RepeatingEmbedItemFormState
            for (const accessor of parent.index(form.index + 1).flatAccessors) {
              if (accessor instanceof FieldAccessor) {
                accessor.setRawFromValue()
              }
            }
          },
        },
        {
          icon: copy,
          label: "Duplicate",
          handler: () => {
            applyPatch(form.state.value, [
              {
                op: "add",
                path: `${form.parent?.path}/${form.index + 1}`,
                value: { ...getSnapshot(embed), id: undefined },
              },
            ])
            const parent = form.parent as RepeatingEmbedItemFormState
            for (const accessor of parent.index(form.index + 1).flatAccessors) {
              if (accessor instanceof FieldAccessor) {
                accessor.setRawFromValue()
              }
            }
          },
        },
        {
          icon: remove,
          label: "Remove",
          handler: () => {
            applyPatch(form.state.value, [
              {
                op: "remove",
                path: form.path,
              },
            ])
          },
        },
      ].filter((item): item is Action => typeof item === "object")}
      hasError={!form.isValid}
    >
      <Stack gap={16}>
        <EmbedAuthorEditor embed={embed} form={form} />
        <Separator />
        <EmbedBodyEditor embed={embed} form={form} />
        <Separator />
        <Section
          name="Fields"
          variant="indented"
          hasError={!form.repeatingForm("fields").isValid}
        >
          <Stack gap={16}>
            {embed.fields.map((field, index) => (
              <EmbedFieldEditor
                key={field.id}
                field={field}
                form={form.repeatingForm("fields").index(index)}
              />
            ))}
            <div>
              <PrimaryButton
                disabled={embed.fields.length >= 25}
                onClick={() => {
                  form.repeatingForm("fields").push({} as FieldLike)
                }}
              >
                Add Field
              </PrimaryButton>
            </div>
          </Stack>
        </Section>
        <Separator />
        <EmbedImagesEditor embed={embed} form={form} />
        <Separator />
        <EmbedFooterEditor embed={embed} form={form} />
      </Stack>
    </Section>
  ))
}
