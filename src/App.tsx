import styled from "@emotion/styled"
import { ThemeProvider } from "emotion-theming"
import React, { useEffect, useState } from "react"
import Editor from "./editor/Editor"
import { toCamelCase } from "./editor/json/casing"
import GlobalStyle from "./GlobalStyle"
import initialMessage from "./initialMessage.json"
import { Message } from "./message/Message"
import Preview from "./message/Preview"
import { darkTheme, lightTheme, Theme } from "./themes"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  height: 100vh;
  overflow: hidden;
`

export default function App() {
  const [message, setMessage] = useState<Message>(() =>
    toCamelCase(initialMessage),
  )

  const [files, setFiles] = useState<FileList | undefined>()

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
        <Editor
          message={message}
          onChange={setMessage}
          files={files}
          onFilesChange={setFiles}
          onToggleTheme={toggleTheme}
          onToggleDisplay={toggleDisplay}
        />
        <Preview message={message} files={files} />
      </Container>
    </ThemeProvider>
  )
}
