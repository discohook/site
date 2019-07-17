import styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"
import React, { useEffect, useState } from "react"
import { FakeFile } from "./editor/backup/Backup"
import { getSharedBackup } from "./editor/backup/sharing"
import Editor from "./editor/Editor"
import GlobalStyle from "./GlobalStyle"
import { initialMessage } from "./initialMessage"
import Preview from "./message/Preview"
import { darkTheme, lightTheme, Theme } from "./themes"

type Props = {
  startUrl: URL
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  max-height: 100vh;
`

const TabSwitcher = styled.div`
  background: rgba(0, 0, 0, 0.2);
  display: flex;
`

const Tab = styled.div<{ active: boolean }>`
  box-sizing: border-box;

  height: 40px;
  padding: 0 12px;
  border-bottom: 2px solid
    ${({ theme, active }) => (active ? theme.accent : theme.text)};

  line-height: 38px;
  vertical-align: center;
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

export default function App(props: Props) {
  const backup = getSharedBackup(props.startUrl) || {
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
    display: displayTheme,
  }

  const [activeTab, setActiveTab] = useState<"preview" | "editor">("preview")
  const isMobile = /mobile/i.test(navigator.userAgent)

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
            <Preview message={message} files={files} />
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
