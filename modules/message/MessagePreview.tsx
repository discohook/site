import { Observer, useObserver } from "mobx-react-lite"
import { rem } from "polished"
import React from "react"
import styled, { css } from "styled-components"
import { Markdown } from "../markdown/Markdown"
import { MarkdownContainer } from "../markdown/styles/MarkdownContainer"
import type { Message } from "./Message"
import { Attachment } from "./preview/attachment/Attachment"
import { MessageHeader } from "./preview/MessageHeader"
import { RichEmbed } from "./preview/RichEmbed"

const Container = styled.div`
  position: relative;

  margin-top: ${rem(16)};

  ${({ theme }) =>
    theme.appearance.display === "cozy" &&
    css`
      padding: ${rem(2)} 16px ${rem(2)} ${rem(72)};

      min-height: ${rem(44)};

      ${({ theme }) =>
        theme.appearance.fontSize > 16 &&
        css`
          padding-left: 72px;
        `};

      ${({ theme }) =>
        theme.appearance.mobile &&
        css`
          padding-left: 16px;
        `}
    `};

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      padding: ${rem(2)} ${rem(16)} ${rem(2)} 80px;

      min-height: ${rem(22)};

      text-indent: calc(${rem(16)} - 80px);

      & > ${MarkdownContainer} {
        display: inline;
        display: contents;
      }
    `}
`

const ExtrasContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  row-gap: ${rem(4)};

  padding: ${rem(2)} 0;

  text-indent: 0;

  & > * {
    justify-self: start;
    align-self: start;
  }
`

export type MessagePreviewProps = {
  message: Message
  className?: string
}

export function MessagePreview(props: MessagePreviewProps) {
  const { message, className } = props

  return useObserver(() => (
    <Container className={className}>
      <MessageHeader username={message.username} avatarUrl={message.avatar} />
      {message.hasContent && (
        <Observer>
          {() => <Markdown content={message.content} type="message-content" />}
        </Observer>
      )}
      {message.hasExtras && (
        <ExtrasContainer>
          {[
            ...message.files.map(file => (
              <Attachment key={`a:${file.name}`} file={file} />
            )),
            ...message.embeds.map(embed => (
              <RichEmbed key={`e:${embed.id}`} embed={embed} />
            )),
          ]}
        </ExtrasContainer>
      )}
    </Container>
  ))
}
