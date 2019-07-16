import styled from "@emotion/styled";
import { ThemeProvider } from "emotion-theming";
import React, { useEffect, useState } from "react";
import { FakeFile } from "./editor/backup/Backup";
import { getSharedBackup } from "./editor/backup/sharing";
import Editor from "./editor/Editor";
import GlobalStyle from "./GlobalStyle";
import { initialMessage } from "./initialMessage";
import Preview from "./message/Preview";
import { darkTheme, lightTheme, Theme } from "./themes";

type Props = {
  startUrl: URL
}

const Container = styled.div`
  display: flex;
  flex-direction: row-reverse;
  align-items: stretch;

  height: 100vh;

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

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <Preview message={message} files={files} />
        <Editor
          message={message}
          onChange={setMessage}
          files={files}
          onFilesChange={setFiles}
          onToggleTheme={toggleTheme}
          onToggleDisplay={toggleDisplay}
        />
      </Container>
    </ThemeProvider>
  )
}
