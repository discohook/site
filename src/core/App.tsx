import { css } from "@emotion/core"
import styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"
import React, { useContext, useEffect, useState } from "react"
import { decodeBackup } from "../backup/sharing"
import Editor from "../editor/Editor"
import { initialMessage } from "../message/initialMessage"
import MessagePreview from "../preview/MessagePreview"
import { SERVER } from "./environment"
import GlobalStyle from "./GlobalStyle"
import { RequestContext } from "./RequestContext"
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
  padding: 0 12px;

  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.accent : theme.text)};
  border-radius: 0;

  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 500;
  font-size: 15px;
  color: ${({ theme }) => theme.header.primary};
  line-height: 38px;
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
    theme.mobile &&
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

    const backup = decodeBackup(encodedBackup || "")
    if (backup && !SERVER) {
      console.log("Loaded with shared backup:", backup)
    }

    return backup || { message: initialMessage, files: [] }
  })

  const [colorTheme, setColorTheme] = useState<"dark" | "light">("dark")
  const toggleTheme = () =>
    setColorTheme(colorTheme === "dark" ? "light" : "dark")

  const [displayTheme, setDisplayTheme] = useState<"cozy" | "compact">("cozy")
  const toggleDisplay = () =>
    setDisplayTheme(displayTheme === "cozy" ? "compact" : "cozy")

  useEffect(() => {
    console.log("Theme updated:", colorTheme, displayTheme)
  }, [colorTheme, displayTheme])

  const theme: Theme = {
    ...(colorTheme === "dark" ? darkTheme : lightTheme),
    color: colorTheme,
    display: displayTheme,
    mobile: /mobile/i.test(
      SERVER && request ? request.get("User-Agent") : navigator.userAgent,
    ),
  }

  const [activeTab, setActiveTab] = useState<"preview" | "editor">("preview")

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        {theme.mobile && (
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
          {(!theme.mobile || activeTab === "preview") && (
            <MessagePreview message={backup.message} files={backup.files} />
          )}
          {(!theme.mobile || activeTab === "editor") && (
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
            />
          )}
        </View>
      </Container>
    </ThemeProvider>
  )
}
