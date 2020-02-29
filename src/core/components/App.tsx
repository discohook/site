import { Context } from "koa"
import React, { useEffect, useState } from "react"
import { ThemeProvider } from "styled-components"
import { GlobalStyle } from "../../appearance/components/GlobalStyle"
import { THEMES } from "../../appearance/constants"
import { DARK_THEME } from "../../appearance/constants/darkTheme"
import { Appearance } from "../../appearance/types/Appearance"
import { Theme } from "../../appearance/types/Theme"
import { Message } from "../../message/classes/Message"
import { INITIAL_MESSAGE_DATA } from "../../message/constants"
import { ModalOverlay } from "../../modal/components/ModalOverlay"
import { useAutorun } from "../../state/hooks/useAutorun"
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

  const [theme, setTheme] = useState<Theme>({
    ...DARK_THEME,
    appearance: {
      color: "dark",
      display: "cozy",
      fontSize: 16,
      mobile: /mobile/i.test(request?.get("User-Agent") ?? navigator.userAgent),
    },
  })
  useEffect(() => {
    console.log("Theme set:", theme.appearance.color, theme.appearance.display)
  }, [theme])

  const handleAppearanceChange = (appearance: Appearance) => {
    setTheme({
      ...THEMES[appearance.color],
      appearance,
    })
  }

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
        onAppearanceChange={handleAppearanceChange}
      />
      <ModalOverlay />
    </ThemeProvider>
  )
}
