import { css } from "@emotion/core"
import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { Theme } from "../core/themes"

const Container = styled.div<{}, Theme>`
  height: 20.8px;
  display: flex;
  margin: 0 0 0 -80px;

  ${({ theme }) =>
    theme.display === "compact" &&
    css`
      height: auto;
      display: inline-flex;
      margin: 0 0 0 -9ch;
    `}
`

const Avatar = styled.img<{}, Theme>`
  width: 40px;
  height: 40px;

  border-radius: 50%;
  margin: 0 20px;

  cursor: pointer;

  object-fit: cover;

  &:hover {
    opacity: 0.8;
  }

  ${({ theme }) =>
    theme.display === "compact" &&
    css`
      display: none;
    `}
`

const HeaderInfo = styled.div<{}, Theme>`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin: 0;

  ${({ theme }) =>
    theme.display === "compact" &&
    css`
      flex-direction: row-reverse;
    `}
`

const UserName = styled.span<{}, Theme>`
  color: ${({ theme }) => theme.header.primary};
  font-weight: 500;
`

const BotTag = styled.span<{}, Theme>`
  position: relative;
  top: 1px;

  display: flex;
  align-items: center;
  justify-content: center;

  width: 23px;
  height: 14px;
  padding: 1px 2px;

  border-radius: 3px;
  margin: 0 4.8px;

  background: ${({ theme }) => theme.accent};

  color: #ffffff;
  font-size: 0.625em;
  font-weight: 500;

  ${({ theme }) =>
    theme.display === "compact" &&
    css`
      width: 21px;
      padding: 0;
    `}
`

const Timestamp = styled.span<{}, Theme>`
  margin: 1px;

  color: ${({ theme }) => theme.text.muted};
  font-size: 12px;

  text-align: right;

  &::before {
    content: "Today at ";
  }

  ${({ theme }) =>
    theme.display === "compact" &&
    css`
      width: 74px;
      margin: 0;

      &::before {
        content: "";
      }
    `}
`

const getTimestamp = () =>
  new Date().toLocaleString("en-US", {
    hour: "2-digit",
    minute: "numeric",
    hour12: true,
  })

type Props = {
  username?: string
  avatarUrl?: string
}

export default function MessageHeader(props: Props) {
  const {
    username = "Discohook",
    avatarUrl = "https://cdn.discordapp.com/embed/avatars/0.png",
  } = props

  const [timestamp, setTimestamp] = useState(getTimestamp)

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(getTimestamp()), 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <Container>
      <Avatar src={String(avatarUrl)} alt="User avatar" />
      <HeaderInfo>
        <UserName>{String(username)}</UserName>
        <BotTag>BOT</BotTag>
        <Timestamp>{timestamp}</Timestamp>
      </HeaderInfo>
    </Container>
  )
}
