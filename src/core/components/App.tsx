import { Context } from "koa"
import { useObserver } from "mobx-react-lite"
import React, { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "../../appearance/components/GlobalStyle"
import { Message } from "../../message/classes/Message"
import { INITIAL_MESSAGE_DATA } from "../../message/constants"
import { ModalOverlay } from "../../modal/components/ModalOverlay"
import { PopoverOverlay } from "../../popover/components/PopoverOverlay"
import { useAutorun } from "../../state/hooks/useAutorun"
import { useStores } from "../../state/hooks/useStores"
import { fetchWebhookInfo } from "../../webhook/helpers/fetchWebhookInfo"
import { Webhook } from "../../webhook/types/Webhook"
import { decodeMessage } from "../helpers/decodeMessage"
import { setUrlToMessage } from "../helpers/setUrlToMessage"
import { Body } from "./Body"

export type AppProps = {
  request?: Context
}

export function App(props: AppProps) {
  const { request } = props

  const { appearanceStore } = useStores()

  const [message] = useState(() => {
    const search = SERVER && request ? request.search : location.search
    const parameters = new URLSearchParams(search)
    const encodedBackup = parameters.get("message") ?? parameters.get("backup")

    const backup = decodeMessage(encodedBackup ?? "")
    if (backup && !SERVER) {
      console.log("Loaded with message:", backup)
    }

    return new Message(backup ?? INITIAL_MESSAGE_DATA)
  })

  useAutorun(() => {
    setUrlToMessage(message.toJS())
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
        message={message}
        webhookUrl={webhookUrl}
        onWebhookUrlChange={setWebhookUrl}
        webhook={webhook}
      />
      <ModalOverlay />
      <PopoverOverlay />
    </ThemeProvider>
  )
}
