import { useObserver } from "mobx-react-lite"
import React from "react"
import styled, { css } from "styled-components"
import { Attachment } from "../../attachment/components/Attachment"
import { Markdown } from "../../markdown/components/Markdown"
import { MarkdownContainer } from "../../markdown/components/MarkdownContainer"
import { Message } from "../../message/classes/Message"
import { getAvatarUrl } from "../../webhook/helpers/getAvatarUrl"
import { Webhook } from "../../webhook/types/Webhook"
import { MessageHeader } from "./MessageHeader"
import { RichEmbed } from "./RichEmbed"

const ScrollContainer = styled.div`
  overflow-y: scroll;
`

const Container = styled.div`
  position: relative;
  flex: 0 0 auto;

  margin-top: 1rem;

  ${({ theme }) =>
    theme.appearance.display === "cozy" &&
    css`
      padding: 0.125rem 16px 0.125rem 4.5rem;

      min-height: 2.75rem;

      ${({ theme }) =>
        theme.appearance.fontSize > 16 &&
        css`
          padding-left: 72px;
        `};
    `};

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      padding: 0.125rem 1rem 0.125rem 80px;

      min-height: 1.375rem;

      text-indent: calc(1rem - 80px);

      & > ${MarkdownContainer} {
        display: inline;
        display: contents;
      }
    `}
`

const ExtrasContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  row-gap: 0.25rem;

  padding: 0.125rem 0;

  text-indent: 0;

  & > * {
    justify-self: start;
    align-self: start;
  }
`

export type MessagePreviewProps = {
  message: Message
  webhook?: Webhook
}

export function MessagePreview(props: MessagePreviewProps) {
  const { message, webhook } = props

  return useObserver(() => (
    <ScrollContainer>
      <Container>
        <MessageHeader
          username={message.username ?? webhook?.name}
          avatarUrl={message.avatar ?? (webhook && getAvatarUrl(webhook))}
        />
        {message.content && (
          <Markdown content={message.content} type="message-content" />
        )}
        {(message.embeds.length > 0 || message.files.length > 0) && (
          <ExtrasContainer>
            {[
              ...message.files.map(file => (
                <Attachment key={`file:${file.name}`} file={file} />
              )),
              ...message.embeds.map(embed => (
                <RichEmbed key={`embed:${embed.id}`} embed={embed} />
              )),
            ]}
          </ExtrasContainer>
        )}
      </Container>
    </ScrollContainer>
  ))
}
