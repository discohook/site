import React from "react"
import styled, { css } from "styled-components"
import { Attachment } from "../../attachment/components/Attachment"
import { Markdown } from "../../markdown/components/Markdown"
import { MarkdownContainer } from "../../markdown/components/MarkdownContainer"
import { getEmbedsWithGallery } from "../../message/helpers/getEmbedsWithGallery"
import { id } from "../../message/helpers/getUniqueId"
import { FileLike } from "../../message/types/FileLike"
import { Message } from "../../message/types/Message"
import { getAvatarUrl } from "../../webhook/helpers/getAvatarUrl"
import { Webhook } from "../../webhook/types/Webhook"
import { MessageHeader } from "./MessageHeader"
import { RichEmbed } from "./RichEmbed"

const ScrollContainer = styled.div`
  overflow-y: scroll;
`

const Container = styled.div`
  margin: 0 0 0 80px;
  padding: 20px 10px 20px 0;

  & > ${MarkdownContainer} {
    display: inline;
  }

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      margin: 0 0 0 9ch;
      padding: 10px;

      & > ${MarkdownContainer} {
        margin-left: 0.3rem;
      }
    `}

  ${({ theme }) =>
    theme.appearance.mobile &&
    css`
      margin: 0;
      padding: 16px;
    `}
`

const EmbedsContainer = styled.div`
  margin: 0 0 8px;
  padding: 0 4px 0 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

export type MessagePreviewProps = {
  message: Message
  files: readonly (File | FileLike)[]
  webhook?: Webhook
}

export function MessagePreview(props: MessagePreviewProps) {
  const { message, files, webhook } = props
  const { content, embeds, username, avatarUrl } = message

  return (
    <ScrollContainer>
      <Container>
        <MessageHeader
          username={username ?? webhook?.name}
          avatarUrl={avatarUrl ?? (webhook && getAvatarUrl(webhook))}
        />
        {content && <Markdown content={content} type="message-content" />}
        {embeds && (
          <EmbedsContainer>
            {getEmbedsWithGallery(embeds).map(embed => (
              <RichEmbed key={embed[id]} embed={embed} />
            ))}
          </EmbedsContainer>
        )}
        {files.map(file => (
          <Attachment file={file} key={file.name} />
        ))}
      </Container>
    </ScrollContainer>
  )
}
