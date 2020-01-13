import React from "react"
import styled, { css } from "styled-components"
import Attachment from "../attachment/Attachment"
import Markup from "../markup/Markup"
import { MarkupContainer } from "../markup/styles"
import { FileLike } from "../message/FileLike"
import { Message } from "../message/Message"
import { id } from "../message/uid"
import { getAvatarUrl } from "../webhook/getAvatarUrl"
import { Webhook } from "../webhook/Webhook"
import { getEmbedsWithGallery } from "./getEmbedsWithGallery"
import MessageHeader from "./MessageHeader"
import RichEmbed from "./RichEmbed"

const ScrollContainer = styled.div`
  overflow-y: scroll;
`

const Container = styled.div`
  margin: 0 0 0 80px;
  padding: 20px 10px 20px 0;

  & > ${MarkupContainer} {
    display: inline;
  }

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      margin: 0 0 0 9ch;
      padding: 10px;

      & > ${MarkupContainer} {
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

type Props = {
  message: Message
  files: readonly (File | FileLike)[]
  webhook?: Webhook
}

export default function MessagePreview(props: Props) {
  const { message, files, webhook } = props
  const { content, embeds, username, avatarUrl } = message

  return (
    <ScrollContainer>
      <Container>
        <MessageHeader
          username={username ?? webhook?.name}
          avatarUrl={avatarUrl ?? (webhook && getAvatarUrl(webhook))}
        />
        {content && <Markup content={content} jumboable />}
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
