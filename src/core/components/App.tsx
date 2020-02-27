import { Context } from "koa"
import React, { useEffect, useState } from "react"
import styled, { css, ThemeProvider } from "styled-components"
import { GlobalStyle } from "../../appearance/components/GlobalStyle"
import { THEMES } from "../../appearance/constants"
import { DARK_THEME } from "../../appearance/constants/darkTheme"
import { Appearance } from "../../appearance/types/Appearance"
import { Theme } from "../../appearance/types/Theme"
import { Editor } from "../../editor/components/Editor"
import { Message } from "../../message/classes/Message"
import { INITIAL_MESSAGE_DATA } from "../../message/constants"
import { MessagePreview } from "../../preview/components/MessagePreview"
import { useAutorun } from "../../state/hooks/useAutorun"
import { fetchWebhookInfo } from "../../webhook/helpers/fetchWebhookInfo"
import { Webhook } from "../../webhook/types/Webhook"
import { decodeMessage } from "../helpers/decodeMessage"
import { setUrlToMessage } from "../helpers/setUrlToMessage"

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`

const TabSwitcher = styled.div`
  display: flex;

  background: ${({ theme }) => theme.background.secondary};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
`

const Tab = styled.button.attrs({ type: "button" })<{ active: boolean }>`
  height: 40px;
  padding: 0 16px;

  background: none;
  border: solid transparent;
  border-width: 2px 0;
  border-radius: 0;

  font-weight: 500;
  font-size: 15px;
  color: ${({ theme }) => theme.header.primary};
  line-height: 38px;

  ${({ active }) =>
    active &&
    css`
      border-bottom-color: ${({ theme }) => theme.accent.primary};
    `}
`

const View = styled.main`
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;

  flex: 1;

  max-height: 100%;

  & > * {
    flex: 1;
  }

  ${({ theme }) =>
    theme.appearance.mobile &&
    css`
      margin: 40px 0 0;
      max-height: calc(100% - 40px);
    `}
`

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

  const [activeTab, setActiveTab] = useState<"preview" | "editor">("preview")

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        {theme.appearance.mobile && (
          <TabSwitcher>
            <Tab
              active={activeTab === "editor"}
              onClick={() => setActiveTab("editor")}
            >
              Editor
            </Tab>
            <Tab
              active={activeTab === "preview"}
              onClick={() => setActiveTab("preview")}
            >
              Preview
            </Tab>
          </TabSwitcher>
        )}
        <View>
          {(!theme.appearance.mobile || activeTab === "preview") && (
            <MessagePreview message={message} webhook={webhook} />
          )}
          {(!theme.appearance.mobile || activeTab === "editor") && (
            <Editor
              message={message}
              onAppearanceChange={handleAppearanceChange}
              webhookUrl={webhookUrl}
              onWebhookUrlChange={setWebhookUrl}
              webhook={webhook}
            />
          )}
        </View>
      </Container>
    </ThemeProvider>
  )
}
