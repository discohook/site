import React from "react"
import styled from "styled-components"
import { Message } from "./Message"
import { MessageHeader } from "./MessageHeader"

interface Props {
  message: Message
}

const Container = styled.div`
  padding: 20px 0;

  background-color: #36393f;
`

export const MessagePreview = (props: Props) => (
  <Container>
    <MessageHeader message={props.message} />
  </Container>
)
