import { useObserver } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import { InputField } from "../../../common/input/text/InputField"
import { Stack } from "../../../common/layout/Stack"
import { ModalManagerContext } from "../../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import type { EditorFormState } from "../../message/state/editorForm"
import { EditorManagerContext } from "../EditorManagerContext"
import { NetworkErrorModal } from "./NetworkErrorModal"

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

  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    const { current: input } = inputRef
    if (!input) return

    const onFocus = () => {
      input.type = "text"
    }
    const onBlur = () => {
      input.type = "password"
    }

    input.addEventListener("focus", onFocus)
    input.addEventListener("blur", onBlur)

    return () => {
      input.removeEventListener("focus", onFocus)
      input.removeEventListener("blur", onBlur)
    }
  }, [])

  return useObserver(() => {
    let submitLabel = "Submit"
    if (editorManager.messages.every(m => !m.reference)) {
      submitLabel = "Send"
    } else if (editorManager.messages.every(m => m.reference)) {
      submitLabel = "Edit"
    }

    return (
      <Stack gap={12}>
        <InputField
          ref={inputRef}
          id="webhook"
          type="password"
          label="Webhook URL"
          placeholder="https://discord.com/api/webhooks/..."
          error={form.subForm("target").field("url").error}
          {...form.subForm("target").field("url").inputProps}
        >
          <PrimaryButton
            disabled={
              !editorManager.target.exists ||
              editorManager.messages.length === 0
            }
            onClick={handleSubmit}
          >
            {submitLabel}
          </PrimaryButton>
        </InputField>
      </Stack>
    )
  })
}
