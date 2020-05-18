import { useObserver } from "mobx-react-lite"
import dynamic from "next/dynamic"
import { em, rem, size } from "polished"
import React, { Key, useContext } from "react"
import styled, { css, useTheme } from "styled-components"
import { DARK_THEME } from "../../../common/style/themes/darkTheme"
import { EditorManagerContext } from "../../editor/EditorManagerContext"

const Clock = dynamic<{ key: Key }>(
  async () => import("./Clock").then(module => module.Clock),
  { ssr: false },
)

const Container = styled.div`
  ${({ theme }) =>
    theme.appearance.display === "cozy" &&
    css`
      position: relative;

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

const Username = styled.h1`
  display: inline;
  vertical-align: baseline;

  margin: 0 ${rem(4)} 0 0;

  color: ${({ theme }) => theme.header.primary};
  font-size: ${rem(16)};
  font-weight: 500;
  line-height: ${rem(22)};

  word-wrap: break-word;

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

export type MessageHeaderProps = {
  username?: string
  avatarUrl?: string
}

export function MessageHeader(props: MessageHeaderProps) {
  let { username, avatarUrl } = props

  const editorManager = useContext(EditorManagerContext)
  if (editorManager) {
    if (!username) username = editorManager.webhook.displayName
    if (!avatarUrl) avatarUrl = editorManager.webhook.displayAvatarUrl
  }

  const theme = useTheme()

  return useObserver(() => {
    let info = [
      <Username key="username">{username}</Username>,
      <BotTag key="bot-tag">BOT</BotTag>,
      <Clock key="clock" />,
    ]

    if (theme.appearance.display === "compact") info = info.reverse()

    return (
      <Container>
        {theme.appearance.display === "cozy" && !theme.appearance.mobile && (
          <Avatar src={avatarUrl} alt="User avatar" />
        )}
        {info}
      </Container>
    )
  })
}
