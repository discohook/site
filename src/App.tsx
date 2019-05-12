import React, { useEffect, useState } from "react"
import styled, { DefaultTheme, ThemeProvider } from "styled-components"
import { Editor } from "./editor/Editor"
import { GlobalStyle } from "./GlobalStyle"
import { initialMessage } from "./initialMessage"
import { Preview } from "./message/Preview"
import { darkTheme, lightTheme } from "./themes"
import { Whitney } from "./Whitney"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 50%);
`

export function App() {
  const [message, setMessage] = useState(initialMessage)
  useEffect(() => console.log("message updated", message), [message])

  const [colorTheme, setColorTheme] = useState<"dark" | "light">("dark")
  const [displayTheme, setDisplayTheme] = useState<"cozy" | "compact">("cozy")
  useEffect(() => console.log("theme updated", colorTheme, displayTheme))

  const theme: DefaultTheme = {
    ...(colorTheme === "dark" ? darkTheme : lightTheme),
    display: displayTheme,
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <Whitney />
        <GlobalStyle />
        <Container>
          <Editor
            message={message}
            onChange={setMessage}
            onToggleTheme={() =>
              setColorTheme(colorTheme === "dark" ? "light" : "dark")
            }
            onToggleDisplay={() =>
              setDisplayTheme(displayTheme === "cozy" ? "compact" : "cozy")
            }
          />
          <Preview message={message} />
        </Container>
      </>
    </ThemeProvider>
  )
}
