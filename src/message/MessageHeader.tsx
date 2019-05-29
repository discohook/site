import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { Message } from "./Message"

interface Props {
  message: Message
}

const Container = styled.div`
  height: ${(props) => (props.theme.display === "cozy" ? "20.8px" : "auto")};
  display: ${(props) =>
    props.theme.display === "cozy" ? "flex" : "inline-flex"};
  margin: ${(props) =>
    props.theme.display === "cozy" ? "0 0 2px -80px" : "0 0 0 -9ch"};
`

const Avatar = styled.img`
  display: ${(props) => (props.theme.display === "cozy" ? "block" : "none")};

  width: 40px;
  height: 40px;

  border-radius: 50%;
  margin: 0 20px;

  cursor: pointer;

  object-fit: cover;

  :hover {
    opacity: 0.8;
  }
`

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  flex-direction: ${(props) =>
    props.theme.display === "cozy" ? "row" : "row-reverse"};
  margin: 0;
`

const UserName = styled.span`
  color: ${(props) => props.theme.message.username};
  font-weight: 500;
`

const BotTag = styled.span`
  position: relative;
  top: 1px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: ${(props) => (props.theme.display === "cozy" ? "23px" : "21px")};
  height: 14px;
  padding: ${(props) => (props.theme.display === "cozy" ? "1px 0 0" : "0")};

  border-radius: 3px;
  margin: 0 4.8px;

  background: ${(props) => props.theme.accent};

  color: #ffffff;
  font-size: ${(props) =>
    props.theme.display === "cozy" ? "10px" : "9.375px"};
  font-weight: 500;
`

const Timestamp = styled.span`
  width: ${(props) => (props.theme.display === "cozy" ? "auto" : "74px")};

  margin: ${(props) => (props.theme.display === "cozy" ? "1px 0 0" : "0")};

  color: ${(props) => props.theme.message.timestamp};
  font-size: 12px;

  text-align: right;

  ::before {
    content: ${(props) =>
      props.theme.display === "cozy" ? "'Today at '" : ""};
  }
`

const getTimestamp = () =>
  new Date().toLocaleString("en-US", {
    hour: "2-digit",
    minute: "numeric",
    hour12: true,
  })

export default function MessageHeader(props: Props) {
  const [timestamp, setTimestamp] = useState(getTimestamp)

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(getTimestamp()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Container>
      <Avatar
        src={
          props.message.avatarUrl ||
          "https://cdn.discordapp.com/embed/avatars/0.png"
        }
      />
      <HeaderInfo>
        <UserName>{props.message.username || "Discohook"}</UserName>
        <BotTag>BOT</BotTag>
        <Timestamp>{timestamp}</Timestamp>
      </HeaderInfo>
    </Container>
  )
}
