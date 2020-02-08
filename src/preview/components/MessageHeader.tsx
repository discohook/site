import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { useTheme } from "../../appearance/hooks/useTheme"
import { darkTheme } from "../../appearance/themes/darkTheme"

const Container = styled.div`
  ${({ theme }) =>
    theme.appearance.display === "cozy" &&
    css`
      position: relative;

      height: 1.375em;

      margin-left: -4.5rem;
      padding-left: 4.5rem;

      ${({ theme }) =>
        theme.appearance.fontSize > 16 &&
        css`
          margin-left: -72px;
          padding-left: 72px;
        `}
    `}

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      display: inline;
      display: contents;
    `}
`

const Avatar = styled.img`
  position: absolute;
  left: 0;
  top: 0.125rem;

  width: 2.5rem;
  height: 2.5rem;

  margin: 0 1rem;

  border-radius: 50%;
  object-fit: cover;

  cursor: pointer;

  &:hover {
    box-shadow: ${({ theme }) => theme.elavation.medium};
  }

  &:active {
    transform: translateY(1px);
  }

  ${({ theme }) =>
    theme.appearance.fontSize > 16 &&
    css`
      width: 40px;
      height: 40px;

      margin: 0 16px;
    `}
`

const Username = styled.span`
  display: inline;
  vertical-align: baseline;

  margin: 0 0.25rem 0 0;

  color: ${({ theme }) => theme.header.primary};
  font-size: 1rem;
  font-weight: 500;
  line-height: 1.375rem;

  cursor: pointer;

  ${({ theme }) =>
    theme.appearance.color === "light" &&
    css`
      font-weight: 600;
    `}
`

const BotTag = styled.span`
  position: relative;
  top: -0.1rem;

  min-height: 1.28em;
  max-height: 1.28em;

  margin: 0.075em 0.25rem 0 0;
  padding: 0.072rem 0.275rem;

  border-radius: 3px;
  background: ${({ theme }) => theme.accent.primary};

  color: ${darkTheme.header.primary};
  font-size: 0.625em;
  font-weight: 500;
  line-height: 1.3;
  vertical-align: baseline;
`

const Timestamp = styled.span`
  margin: 0 0 0 0.25rem;

  color: ${({ theme }) => theme.text.muted};
  font-size: 0.75rem;
  font-weight: 500;

  &::before {
    content: "Today at ";
  }

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      top: 2px;

      width: calc(20px + 8ch);
      margin-left: 0;

      font-size: 0.6875rem;
      text-align: right;

      margin: 0 0.3rem 0 0;

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

export type MessageHeaderProps = {
  username?: string
  avatarUrl?: string
}

export function MessageHeader(props: MessageHeaderProps) {
  const {
    username = "Discohook",
    avatarUrl = "https://discohook.jaylineko.com/assets/discord-avatar.png",
  } = props

  const [timestamp, setTimestamp] = useState(getTimestamp)

  useEffect(() => {
    const interval = setInterval(() => setTimestamp(getTimestamp()), 1000)
    return () => clearInterval(interval)
  }, [])

  const theme = useTheme()

  return (
    <Container>
      {theme.appearance.display === "cozy" && !theme.appearance.mobile && (
        <Avatar src={avatarUrl} alt="User avatar" />
      )}
      <Username>{username}</Username>
      <BotTag>BOT</BotTag>
      <Timestamp>{timestamp}</Timestamp>
    </Container>
  )
}
