import React from "react"
import styled from "styled-components"
import { Message } from "./Message"
import { MessagePreview } from "./MessagePreview"

interface Props {
  message: Message
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`

export default function Preview(props: Props) {
  return (
    <Container>
      <MessagePreview message={props.message} />
    </Container>
  )
}
