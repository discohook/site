import { useObserver } from "mobx-react-lite"
import { em, rem, size } from "polished"
import React, { useEffect, useState } from "react"
import styled, { css } from "styled-components"
import { DARK_THEME } from "../../appearance/constants/darkTheme"
import { useTheme } from "../../appearance/hooks/useTheme"
import { useStores } from "../../state/hooks/useStores"

const Container = styled.div`
  ${({ theme }) =>
    theme.appearance.display === "cozy" &&
    css`
      position: relative;

      height: ${em(22)};

      margin-left: ${rem(-72)};
      padding-left: ${rem(72)};

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
  ${size(rem(40))};

  position: absolute;
  left: 0;
  top: ${rem(2)};

  margin: 0 ${rem(16)};

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
      ${size(40)};

      margin: 0 16px;
    `}
`

const Username = styled.span`
  display: inline;
  vertical-align: baseline;

  margin-right: ${rem(4)};

  color: ${({ theme }) => theme.header.primary};
  font-size: ${rem(16)};
  font-weight: 500;
  line-height: ${rem(22)};

  cursor: pointer;

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      margin-right: ${rem(8)};
    `}

  ${({ theme }) =>
    theme.appearance.color === "light" &&
    css`
      font-weight: 600;
    `}
`

const BotTag = styled.span`
  position: relative;
  top: ${rem(-1.6)};

  min-height: ${em(20.4)};
  max-height: ${em(20.4)};

  margin: ${em(1.2)} ${rem(4)} 0 0;
  padding: ${rem(1.15)} ${rem(4.4)};

  border-radius: 3px;
  background: ${({ theme }) => theme.accent.primary};

  color: ${DARK_THEME.header.primary};
  font-size: ${em(10)};
  font-weight: 500;
  line-height: 1.3;
  vertical-align: baseline;
`

const Timestamp = styled.span`
  display: inline-block;
  height: ${rem(20)};

  color: ${({ theme }) => theme.text.muted};

  ${({ theme }) =>
    theme.appearance.display === "cozy" &&
    css`
      margin-left: ${rem(4)};

      font-size: ${rem(12)};
      font-weight: 500;
      line-height: ${rem(22)};
      vertical-align: baseline;

      &::before {
        content: "Today at ";
      }
    `}

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      width: ${rem(48)};
      margin-right: ${rem(8)};

      font-size: ${rem(11)};
      line-height: ${rem(22)};
      text-align: right;
      text-indent: 0;

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

export function MessageHeader() {
  const { webhookStore } = useStores()

  const [timestamp, setTimestamp] = useState(getTimestamp)
  useEffect(() => {
    const interval = setInterval(() => setTimestamp(getTimestamp()), 1000)
    return () => clearInterval(interval)
  }, [])

  const theme = useTheme()

  return useObserver(() => {
    let info = [
      <Username key="username">{webhookStore.displayName}</Username>,
      <BotTag key="bot-tag">BOT</BotTag>,
      <Timestamp key="timestamp">{timestamp}</Timestamp>,
    ]

    if (theme.appearance.display === "compact") info = info.reverse()

    return (
      <Container>
        {theme.appearance.display === "cozy" && !theme.appearance.mobile && (
          <Avatar src={webhookStore.displayAvatarUrl} alt="User avatar" />
        )}
        {info}
      </Container>
    )
  })
}
