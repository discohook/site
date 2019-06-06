import { ThemeProvider } from "emotion-theming"
import React, { useEffect, useState } from "react"
import Editor from "./editor/Editor"
import { toCamelCase } from "./editor/json/casing"
import GlobalStyle from "./GlobalStyle"
import initialMessage from "./initialMessage.json"
import { Message } from "./message/Message"
import Preview from "./message/Preview"
import styled, { Theme } from "./styled"
import { darkTheme, lightTheme } from "./themes"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
  height: 100vh;
  overflow: hidden;
`

export default function App() {
  const [message, setMessage] = useState(() => {
    return toCamelCase(initialMessage) as Message
  })

  const [files, setFiles] = useState<FileList | undefined>()

  const [colorTheme, setColorTheme] = useState<"dark" | "light">("dark")
  const [displayTheme, setDisplayTheme] = useState<"cozy" | "compact">("cozy")
  useEffect(() => {
    console.log("Theme updated:", colorTheme, displayTheme)
  }, [colorTheme, displayTheme])

  const theme: Theme = {
    ...(colorTheme === "dark" ? darkTheme : lightTheme),
    display: displayTheme,
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyle />
        <Container>
          <Editor
            message={message}
            onChange={setMessage}
            files={files}
            onFilesChange={setFiles}
            onToggleTheme={() =>
              setColorTheme(colorTheme === "dark" ? "light" : "dark")
            }
            onToggleDisplay={() =>
              setDisplayTheme(displayTheme === "cozy" ? "compact" : "cozy")
            }
          />
          <Preview message={message} files={files} />
        </Container>
      </>
    </ThemeProvider>
  )
}
