import { useObserver } from "mobx-react-lite"
import { applyPatch, getSnapshot } from "mobx-state-tree"
import { FieldAccessor } from "mstform"
import React from "react"
import styled from "styled-components"
import { Checkbox } from "../../../common/input/checkable/Checkbox"
import { InputField } from "../../../common/input/text/InputField"
import type { Action } from "../../../common/layout/ActionButtons"
import { Section } from "../../../common/layout/Section"
import { Stack } from "../../../common/layout/Stack"
import { chevron, chevronDown } from "../../../icons/chevron"
import { copy } from "../../../icons/copy"
import { remove } from "../../../icons/remove"
import type {
  FieldItemFormState,
  RepeatingFieldItemFormState,
} from "../../message/state/editorForm"
import type { FieldLike } from "../../message/state/models/FieldModel"

const InlineCheckbox = styled(Checkbox)`
  margin-left: 12px;
`

export type EmbedFieldEditorProps = {
  field: FieldLike
  form: FieldItemFormState
}

export function EmbedFieldEditor(props: EmbedFieldEditorProps) {
  const { field, form } = props

  const name = useObserver(() => {
    let name = `Field ${form.index + 1}`
    if (field.displayName) {
      name += ` — ${field.displayName}`
    }
    return name
  })

  return useObserver(() => (
    <Section
      name={name}
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
                value: getSnapshot(field),
              },
            ])
            const parent = form.parent as RepeatingFieldItemFormState
            for (const accessor of parent.index(form.index - 1).flatAccessors) {
              if (accessor instanceof FieldAccessor) {
                accessor.setRawFromValue()
              }
            }
          },
        },
        form.index !== field.embed.fields.length - 1 && {
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
                value: getSnapshot(field),
              },
            ])
            const parent = form.parent as RepeatingFieldItemFormState
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
                value: { ...getSnapshot(field), id: undefined },
              },
            ])
            const parent = form.parent as RepeatingFieldItemFormState
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
      <Stack gap={12}>
        <InputField
          id={`_${field.id}_name`}
          label="Field Name"
          maxLength={256}
          required
          rows={1}
          error={form.field("name").error}
          {...form.field("name").inputProps}
        >
          <InlineCheckbox
            id={`_${field.id}_inline`}
            label="Inline"
            {...form.field("inline").inputProps}
          />
        </InputField>
        <InputField
          id={`_${field.id}_value`}
          label="Field Value"
          maxLength={1024}
          required
          rows={4}
          error={form.field("value").error}
          {...form.field("value").inputProps}
        />
      </Stack>
    </Section>
  ))
}
