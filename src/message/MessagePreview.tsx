import React from "react"
import styled from "styled-components"
import { Markup } from "./Markup"
import { Message } from "./Message"
import { MessageHeader } from "./MessageHeader"

interface Props {
  message: Message
}

const Container = styled.div`
  padding: 20px 0;

  background-color: #36393f;
`

const MessageBody = styled.div`
  margin: 1px 0 0 80px;
  padding: 0 10px 0 0;

  color: #dcddde;
  font-size: 15px;
`

export const MessagePreview = (props: Props) => (
  <Container>
    <MessageHeader message={props.message} />
    <MessageBody>
      {props.message.content && <Markup content={props.message.content} />}
    </MessageBody>
  </Container>
)
