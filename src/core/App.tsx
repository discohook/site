import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"
import React, { useContext, useEffect, useRef, useState } from "react"
import Editor from "../editor/Editor"
import { initialMessage } from "../message/initialMessage"
import MessagePreview from "../preview/MessagePreview"
import { fetchWebhookInfo } from "../webhook/fetchWebhookInfo"
import { Webhook } from "../webhook/Webhook"
import { SERVER } from "./environment"
import GlobalStyle from "./GlobalStyle"
import { RequestContext } from "./RequestContext"
import { decodeBackup, setUrlToBackup } from "./sharing"
import { darkTheme, lightTheme, Theme } from "./themes"

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100%;
`

const TabSwitcher = styled.div<{}, Theme>`
  display: flex;

  background: ${({ theme }) => theme.background.secondary};

  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  z-index: 1;
`

const Tab = styled.button<{ active: boolean }, Theme>`
  height: 40px;
  padding: 0 16px;

  background: transparent;
  border: none;
  border: solid transparent;
  border-width: 2px 0;
  border-radius: 0;

  font-weight: 500;
  font-size: 15px;
  color: ${({ theme }) => theme.header.primary};
  line-height: 38px;

  ${({ theme, active }) =>
    active &&
    css`
      border-bottom-color: ${theme.accent.primary};
    `}
`
Tab.defaultProps = { type: "button" }

const View = styled.main<{}, Theme>`
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

export default function App() {
  const request = useContext(RequestContext)

  const [backup, setBackup] = useState(() => {
    const search = SERVER && request ? request.search : location.search
    const parameters = new URLSearchParams(search)
    const encodedBackup = parameters.get("backup")

    const backup = decodeBackup(encodedBackup ?? "")
    if (backup && !SERVER) {
      console.log("Loaded with shared backup:", backup)
    }

    return backup ?? { message: initialMessage, files: [] }
  })

  const lastUrlChangeRef = useRef(0)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      lastUrlChangeRef.current = Date.now()
      setUrlToBackup(backup)
    }, Math.max(1000 - (Date.now() - lastUrlChangeRef.current), 0))

    return () => clearTimeout(timeoutId)
  }, [backup])

  const [theme, setTheme] = useState<Theme>({
    ...darkTheme,
    appearance: {
      color: "dark",
      display: "cozy",
      mobile: /mobile/i.test(request?.get("User-Agent") ?? navigator.userAgent),
    },
  })
  useEffect(() => {
    console.log("Theme set:", theme.appearance.color, theme.appearance.display)
  }, [theme])

  const toggleTheme = () =>
    setTheme(theme => {
      const newTheme = theme.appearance.color === "dark" ? "light" : "dark"
      return {
        ...(newTheme === "dark" ? darkTheme : lightTheme),
        appearance: {
          ...theme.appearance,
          color: newTheme,
        },
      }
    })
  const toggleDisplay = () =>
    setTheme(theme => ({
      ...theme,
      appearance: {
        ...theme.appearance,
        display: theme.appearance.display === "cozy" ? "compact" : "cozy",
      },
    }))

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
            <MessagePreview
              message={backup.message}
              files={backup.files}
              webhook={webhook}
            />
          )}
          {(!theme.appearance.mobile || activeTab === "editor") && (
            <Editor
              message={backup.message}
              onChange={message =>
                setBackup(backup => ({ ...backup, message }))
              }
              files={backup.files}
              onFilesChange={files =>
                setBackup(backup => ({ ...backup, files }))
              }
              onToggleTheme={toggleTheme}
              onToggleDisplay={toggleDisplay}
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
