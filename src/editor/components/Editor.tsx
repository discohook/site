import React, { useState } from "react"
import styled from "styled-components"
import { AppearanceModal } from "../../appearance/components/AppearanceModal"
import { DARK_THEME } from "../../appearance/constants/darkTheme"
import { useTheme } from "../../appearance/hooks/useTheme"
import { Appearance } from "../../appearance/types/Appearance"
import { Button } from "../../form/components/Button"
import { InputField } from "../../form/components/InputField"
import { JsonInput } from "../../json/components/JsonInput"
import { Message } from "../../message/classes/Message"
import { getTotalCharacterCount } from "../../message/helpers/getTotalCharacterCount"
import { useStores } from "../../state/hooks/useStores"
import { WEBHOOK_URL_RE } from "../../webhook/constants"
import { executeWebhook } from "../../webhook/helpers/executeWebhook"
import { Webhook } from "../../webhook/types/Webhook"
import { Actions } from "./Actions"
import { FlexContainer } from "./Container"
import { MessageEditor } from "./MessageEditor"

const EditorContainer = styled.div`
  position: relative;
`

const EditorInnerContainer = styled(FlexContainer)`
  display: block;
  height: 100%;
  overflow-y: scroll;
  padding: 8px;

  & > *:not(button) {
    flex-grow: 0;
  }
`

const JavaScriptWarning = styled.noscript`
  display: block;

  margin: -8px -8px 16px;
  padding: 16px;
  background: ${({ theme }) => theme.accent.danger};
  color: ${DARK_THEME.header.primary};
`

const DisabledReason = styled.div`
  margin: 0 8px 16px;

  color: ${({ theme }) => theme.accent.danger};
  font-size: 14px;

  text-align: end;
`

export type EditorProps = {
  message: Message
  onAppearanceChange: (appearance: Appearance) => void
  webhookUrl: string
  onWebhookUrlChange: (webhookUrl: string) => void
  webhook?: Webhook
}

export function Editor(props: EditorProps) {
  const {
    message,
    onAppearanceChange: handleAppearanceChange,
    webhookUrl,
    onWebhookUrlChange: handleWebhookUrlChange,
    webhook,
  } = props

  const theme = useTheme()

  const [sending, setSending] = useState(false)
  const sendMessage = async () => {
    if (sending) return
    setSending(true)

    try {
      await executeWebhook(webhookUrl, message.toJS())
    } catch (error) {
      console.error("Error executing webhook:", error)
    }

    setSending(false)
  }

  const isOverDiscordCharacterLimit =
    getTotalCharacterCount(message.toJS()) > 6000

  let isDisabled: boolean
  if (sending) isDisabled = true
  else if (!WEBHOOK_URL_RE.test(webhookUrl)) isDisabled = true
  else if (isOverDiscordCharacterLimit) isDisabled = true
  else if (typeof message.content === "string") isDisabled = false
  else if (message.embeds.length > 0) isDisabled = false
  else if (message.files.length > 0) isDisabled = false
  else isDisabled = true

  const [isAppearanceModalShown, setIsAppearanceModalShown] = useState(false)

  const { modalStore } = useStores()

  return (
    <EditorContainer>
      <EditorInnerContainer
        style={isAppearanceModalShown ? { overflow: "hidden" } : undefined}
      >
        <JavaScriptWarning>
          Discohook requires JavaScript to be enabled, please turn it on in your
          browser settings to use this app.
        </JavaScriptWarning>
        <Actions
          title={theme.appearance.mobile ? undefined : "Message editor"}
          actions={[
            {
              name: "Appearance",
              action: () => setIsAppearanceModalShown(true),
            },
            {
              name: "Clear all",
              action: () => message.apply({}),
            },
          ]}
        />
        <FlexContainer flow="row">
          <InputField
            id="webhook-url"
            value={webhookUrl}
            onChange={handleWebhookUrlChange}
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
        <MessageEditor message={message} webhook={webhook} />
        <JsonInput message={message} />
      </EditorInnerContainer>
      {isAppearanceModalShown && (
        <AppearanceModal
          onAppearanceChange={handleAppearanceChange}
          onClose={() => setIsAppearanceModalShown(false)}
        />
      )}
    </EditorContainer>
  )
}
