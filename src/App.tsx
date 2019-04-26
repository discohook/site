import React, { useState } from "react"
import styled from "styled-components"
import { Editor } from "./editor/Editor"
import { GlobalStyle } from "./GlobalStyle"
import { initialMessage } from "./initialMessage"
import { Preview } from "./message/Preview"
import { Whitney } from "./Whitney"

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`

export const App = () => {
  const [message, setMessage] = useState(initialMessage)

  return (
    <>
      <Whitney />
      <GlobalStyle />
      <Container>
        <Editor message={message} onChange={setMessage} />
        <Preview message={message} />
      </Container>
    </>
  )
}
