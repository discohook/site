import { useObserver } from "mobx-react-lite"
import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../../../common/input/Button"
import { InputField } from "../../../common/input/InputField"
import { ModalManagerContext } from "../../../common/modal/ModalManagerContext"
import { useRequiredContext } from "../../../common/state/useRequiredContext"
import { getTotalCharacterCount } from "../../message/helpers/getTotalCharacterCount"
import { EditorManagerContext } from "../EditorManagerContext"
import { FlexContainer } from "../styles/FlexContainer"
import { WEBHOOK_URL_RE } from "./constants"
import { executeWebhook } from "./executeWebhook"
import { NetworkErrorModal } from "./NetworkErrorModal"

const DisabledReason = styled.div`
  margin: 0 8px 16px;

  color: ${({ theme }) => theme.accent.danger};
  font-size: 14px;

  text-align: end;
`

export function WebhookControls() {
  const editorManager = useRequiredContext(EditorManagerContext)
  const message = useObserver(() => editorManager.message)

  const modalManager = useRequiredContext(ModalManagerContext)

  const [sending, setSending] = useState(false)
  const sendMessage = async () => {
    if (sending) return
    setSending(true)

    try {
      await executeWebhook(editorManager)
    } catch {
      modalManager.spawn({
        render: () => <NetworkErrorModal />,
      })
    }

    setSending(false)
  }

  return useObserver(() => {
    const isOverDiscordCharacterLimit =
      getTotalCharacterCount(message.getMessageData()) > 6000

    let isDisabled: boolean
    if (sending) isDisabled = true
    else if (!WEBHOOK_URL_RE.test(editorManager.webhook.url)) isDisabled = true
    else if (isOverDiscordCharacterLimit) isDisabled = true
    else if (typeof message.content === "string") isDisabled = false
    else if (message.embeds.length > 0) isDisabled = false
    else if (message.files.length > 0) isDisabled = false
    else isDisabled = true

    return (
      <>
        <FlexContainer flow="row">
          <InputField
            id="webhook-url"
            value={editorManager.webhook.url}
            onChange={url => {
              editorManager.webhook.url = url
            }}
            label="Webhook URL"
            placeholder="https://discord.com/api/webhooks/..."
          />
          <Button disabled={isDisabled} onClick={sendMessage}>
            Send
          </Button>
        </FlexContainer>
        {isOverDiscordCharacterLimit && (
          <DisabledReason>
            The message body is over Discord&apos;s 6000 character limit
          </DisabledReason>
        )}
      </>
    )
  })
}
