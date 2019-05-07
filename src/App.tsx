import React, { useEffect, useState } from "react"
import styled, { ThemeProvider } from "styled-components"
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

export const App = () => {
  const [message, setMessage] = useState(initialMessage)
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  useEffect(() => console.log("message updated", message), [message])

  return (
    <ThemeProvider theme={theme === "dark" ? darkTheme : lightTheme}>
      <>
        <Whitney />
        <GlobalStyle />
        <Container>
          <Editor
            message={message}
            onChange={setMessage}
            onToggleTheme={() => setTheme(theme === "dark" ? "light" : "dark")}
          />
          <Preview message={message} />
        </Container>
      </>
    </ThemeProvider>
  )
}
