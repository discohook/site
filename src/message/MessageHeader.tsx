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

const Avatar = styled.div`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  margin: -2px 20px;

  cursor: pointer;

  background-size: cover;
  background-position: center;

  :hover {
    opacity: 0.8;
  }
`

const HeaderInfo = styled.div``

const UserName = styled.span`
  color: ${(props) => props.theme.message.username};
  font-weight: 500;
`

const BotTag = styled.span`
  position: relative;
  top: -1px;

  padding: 1px 2px;
  border-radius: 3px;
  margin: 0 0 0 4.8px;

  background: ${(props) => props.theme.accent};

  color: #ffffff;
  font-size: 10px;
  font-weight: 500;
`

const Timestamp = styled.span`
  margin: 0 0 0 4.8px;

  color: ${(props) => props.theme.message.timestamp};
  font-size: 12px;
`

export const MessageHeader = (props: Props) => (
  <Container>
    <Avatar
      style={{
        backgroundImage: `url(${props.message.avatarUrl ||
          "https://cdn.discordapp.com/embed/avatars/0.png"})`,
      }}
    />
    <HeaderInfo>
      <UserName>{props.message.username || "Captain Hook"}</UserName>
      <BotTag>BOT</BotTag>
      <Timestamp>Today at 13:37</Timestamp>
    </HeaderInfo>
  </Container>
)
