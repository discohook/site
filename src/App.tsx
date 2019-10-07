import styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"
import React, { useContext, useEffect, useState } from "react"
import { FakeFile } from "./editor/backup/Backup"
import { getSharedBackup } from "./editor/backup/sharing"
import Editor from "./editor/Editor"
import GlobalStyle from "./GlobalStyle"
import { initialMessage } from "./initialMessage"
import MessagePreview from "./message/MessagePreview"
import { RequestContext } from "./RequestContext"
import { darkTheme, lightTheme, Theme } from "./themes"

const Container = styled.div`
  display: flex;
  flex-direction: column;

  height: 100vh;
`

const TabSwitcher = styled.div`
  background: rgba(0, 0, 0, 0.2);
  display: flex;
`

const Tab = styled.button<{ active: boolean }, Theme>`
  box-sizing: border-box;

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

  max-height: ${({ mobile }) => (mobile ? "calc(100vh - 40px)" : "100vh")};
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
  const [files, setFiles] = useState<FileList | FakeFile[]>(backup.files)

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
