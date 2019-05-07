import React from "react"
import styled from "styled-components"
import { MessageEmbed } from "./embed/MessageEmbed"
import { Markup } from "./markup/Markup"
import { Message } from "./Message"
import { MessageHeader } from "./MessageHeader"

interface Props {
  message: Message
}

const Container = styled.div`
  padding: 20px 0;
`

const MessageBody = styled.div`
  margin: 1px 0 0 80px;
  padding: 0 10px 0 0;

  font-size: 15px;
  line-height: 1.3;
`

export const MessagePreview = (props: Props) => (
  <Container>
    <MessageHeader message={props.message} />
    <MessageBody>
      {props.message.content && <Markup content={props.message.content} />}
      {props.message.embeds &&
        props.message.embeds.map((embed, index) => (
          <MessageEmbed embed={embed} key={index} />
        ))}
    </MessageBody>
  </Container>
)
