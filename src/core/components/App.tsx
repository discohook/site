import { useObserver } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "../../appearance/components/GlobalStyle"
import { ModalOverlay } from "../../modal/components/ModalOverlay"
import { PopoverOverlay } from "../../popover/components/PopoverOverlay"
import { useAutorun } from "../../state/hooks/useAutorun"
import { useStores } from "../../state/hooks/useStores"
import { fetchWebhookInfo } from "../../webhook/helpers/fetchWebhookInfo"
import { Webhook } from "../../webhook/types/Webhook"
import { setUrlToMessage } from "../helpers/setUrlToMessage"
import { Body } from "./Body"

export function App() {
  const { appearanceStore, messageStore } = useStores()

  useAutorun(() => {
    setUrlToMessage(messageStore.message.toJS())
  })

  const theme = useObserver(() => appearanceStore.theme)

  const [webhookUrl, setWebhookUrl] = useState("")
  const [webhook, setWebhook] = useState<Webhook>()
  useEffect(() => {
    fetchWebhookInfo(webhookUrl)
      .then(setWebhook)
      .catch(() => setWebhook(undefined))
  }, [webhookUrl])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Body
        webhookUrl={webhookUrl}
        onWebhookUrlChange={setWebhookUrl}
        webhook={webhook}
      />
      <ModalOverlay />
      <PopoverOverlay />
    </ThemeProvider>
  )
}
