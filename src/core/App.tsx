import styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"
import React, { useContext, useEffect, useState } from "react"
import { FileLike } from "../backup/Backup"
import { getSharedBackup } from "../backup/sharing"
import Editor from "../editor/Editor"
import { initialMessage } from "../message/initialMessage"
import MessagePreview from "../preview/MessagePreview"
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

const View = styled.div<{ mobile: boolean }>`
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;

  margin-top: ${({ mobile }) => (mobile ? "40px" : "0")};
  flex: 1;

  & > * {
    flex: 1;
  }
`

export default function App() {
  const request = useContext(RequestContext)

  const backup = getSharedBackup(request.URL || new URL(location.href)) || {
    message: initialMessage,
    files: [],
  }

  const [message, setMessage] = useState(backup.message)
  const [files, setFiles] = useState<(File | FileLike)[]>(backup.files)

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
  }

  const [activeTab, setActiveTab] = useState<"preview" | "editor">("preview")

  const isMobile = /mobile/i.test(
    (request.get && request.get("content-type")) || navigator.userAgent,
  )

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        {isMobile && (
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
        <View mobile={isMobile}>
          {(!isMobile || activeTab === "preview") && (
            <MessagePreview message={message} files={files} />
          )}
          {(!isMobile || activeTab === "editor") && (
            <Editor
              message={message}
              onChange={setMessage}
              files={files}
              onFilesChange={setFiles}
              onToggleTheme={toggleTheme}
              onToggleDisplay={toggleDisplay}
            />
          )}
        </View>
      </Container>
    </ThemeProvider>
  )
}
