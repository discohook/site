import { useObserver } from "mobx-react-lite"
import React, { useState } from "react"
import styled from "styled-components"
import { Button } from "../../form/components/Button"
import { InputField } from "../../form/components/InputField"
import { getTotalCharacterCount } from "../../message/helpers/getTotalCharacterCount"
import { useStores } from "../../state/hooks/useStores"
import { WEBHOOK_URL_RE } from "../../webhook/constants"
import { executeWebhook } from "../../webhook/helpers/executeWebhook"
import { FlexContainer } from "./Container"

const DisabledReason = styled.div`
  margin: 0 8px 16px;

  color: ${({ theme }) => theme.accent.danger};
  font-size: 14px;

  text-align: end;
`

export function WebhookControls() {
  const { messageStore, webhookStore } = useStores()
  const message = useObserver(() => messageStore.message)

  const [sending, setSending] = useState(false)
  const sendMessage = async () => {
    if (sending) return
    setSending(true)

    try {
      await executeWebhook(webhookStore.url, message.getMessageData())
    } catch (error) {
      console.error("Error executing webhook:", error)
    }

    setSending(false)
  }

  return useObserver(() => {
    const isOverDiscordCharacterLimit =
      getTotalCharacterCount(message.getMessageData()) > 6000

    let isDisabled: boolean
    if (sending) isDisabled = true
    else if (!WEBHOOK_URL_RE.test(webhookStore.url)) isDisabled = true
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
            value={webhookStore.url}
            onChange={url => {
              webhookStore.url = url
            }}
            label="Webhook URL"
            placeholder="https://discordapp.com/api/webhooks/..."
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
