import React from "react"
import styled from "styled-components"
import { Message } from "./Message"

interface Props {
  message: Message
}

const Container = styled.div`
  height: 20.8px;
  display: flex;
`

const Avatar = styled.div<{ url: string }>`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  margin: -2px 20px;

  cursor: pointer;

  background-size: cover;
  background-position: center;
  background-image: ${(props) => `url(${props.url})`};
`

const HeaderInfo = styled.div``

const UserName = styled.span`
  color: #ffffff;
  font-weight: 500;
`

const BotTag = styled.span`
  position: relative;
  top: -1px;

  padding: 1px 2px;
  border-radius: 3px;
  margin: 0 0 0 4.8px;

  background: #7289da;

  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
`

const Timestamp = styled.span`
  margin: 0 0 0 4.8px;

  color: rgba(255, 255, 255, 0.2);
  font-size: 12px;
`

export const MessageHeader = (props: Props) => (
  <Container>
    <Avatar
      url={
        props.message.avatarUrl ||
        "https://cdn.discordapp.com/embed/avatars/0.png"
      }
    />
    <HeaderInfo>
      <UserName>{props.message.username || "Captain Hook"}</UserName>
      <BotTag>BOT</BotTag>
      <Timestamp>Today at 13:37</Timestamp>
    </HeaderInfo>
  </Container>
)
