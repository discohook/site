import { useObserver } from "mobx-react-lite"
import { applyPatch } from "mobx-state-tree"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import { SecondaryButton } from "../../../common/input/button/SecondaryButton"
import { HiddenInputField } from "../../../common/input/text/HiddenInputField"
import { IconButton } from "../../../common/layout/IconButton"
import { Stack } from "../../../common/layout/Stack"
import { ModalManagerContext } from "../../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { remove } from "../../../icons/remove"
import type { EditorFormState } from "../../message/state/editorForm"
import { EditorManagerContext } from "../EditorManagerContext"
import { NetworkErrorModal } from "./NetworkErrorModal"

const InputAction = styled(IconButton)`
  margin-left: 8px;
`

export type WebhookControlsProps = {
  form: EditorFormState
}

export function WebhookControls(props: WebhookControlsProps) {
  const { form } = props

  const editorManager = useRequiredContext(EditorManagerContext)

  const modalManager = useRequiredContext(ModalManagerContext)

  const [submitting, setSubmitting] = useState(false)
  const handleSubmit = async () => {
    if (submitting) return

    form.validate()
    if (!form.isValid) return

    setSubmitting(true)

    try {
      await form.save()
    } catch {
      modalManager.spawn({
        render: () => <NetworkErrorModal />,
      })
    }

    setSubmitting(false)
  }

  useEffect(() => {
    if (editorManager.targets.length > 0) return

    applyPatch(form.state.value, [
      {
        op: "add",
        path: "/targets/0",
        value: {},
      },
    ])
  })

  return useObserver(() => {
    let submitLabel = "Submit"
    if (editorManager.messages.every(message => !message.reference)) {
      submitLabel = "Send"
    } else if (editorManager.messages.every(message => message.reference)) {
      submitLabel = "Edit"
    }

    return (
      <Stack gap={8}>
        {editorManager.targets.map((target, index) => {
          const targetForm = form.repeatingForm("targets").index(index)

          return (
            <HiddenInputField
              key={target.id}
              id={`_${target.id}_url`}
              label="Webhook URL"
              hideLabel={index > 0}
              placeholder="https://discord.com/api/webhooks/..."
              error={targetForm.field("url").error}
              {...targetForm.field("url").inputProps}
            >
              {index === 0 ? (
                <PrimaryButton
                  disabled={
                    editorManager.targets.some(target => !target.exists) ||
                    editorManager.messages.length === 0
                  }
                  onClick={handleSubmit}
                >
                  {submitLabel}
                </PrimaryButton>
              ) : (
                <InputAction
                  icon={remove}
                  label="Remove"
                  onClick={() => {
                    applyPatch(targetForm.state.value, [
                      {
                        op: "remove",
                        path: targetForm.path,
                      },
                    ])
                  }}
                />
              )}
            </HiddenInputField>
          )
        })}
        <div>
          <SecondaryButton
            onClick={() => {
              applyPatch(form.state.value, [
                {
                  op: "add",
                  path: `/targets/${editorManager.targets.length}`,
                  value: {},
                },
              ])
            }}
          >
            Add Webhook
          </SecondaryButton>
        </div>
      </Stack>
    )
  })
}
