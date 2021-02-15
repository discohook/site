import { useObserver } from "mobx-react-lite"
import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { PrimaryButton } from "../../../common/input/button/PrimaryButton"
import { InputField } from "../../../common/input/text/InputField"
import { Stack } from "../../../common/layout/Stack"
import { ModalManagerContext } from "../../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { Markdown } from "../../markdown/Markdown"
import type { EditorFormState } from "../../message/state/editorForm"
import { EditorManagerContext } from "../EditorManagerContext"
import { NetworkErrorModal } from "./NetworkErrorModal"

const Message = styled(Markdown)`
  margin-top: -8px;
  font-size: 15px;
`

export type WebhookControlsProps = {
  form: EditorFormState
}

export function WebhookControls(props: WebhookControlsProps) {
  const { form } = props

  const editorManager = useRequiredContext(EditorManagerContext)

  const modalManager = useRequiredContext(ModalManagerContext)

  const [sending, setSending] = useState(false)
  const handleSend = async () => {
    if (sending) return

    form.validate()
    if (!form.isValid) return

    setSending(true)

    try {
      await form.save()
    } catch {
      modalManager.spawn({
        render: () => <NetworkErrorModal />,
      })
    }

    setSending(false)
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

  return useObserver(() => (
    <Stack gap={12} />
  ))
}
