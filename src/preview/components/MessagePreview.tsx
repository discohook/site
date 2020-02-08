import React from "react"
import styled, { css } from "styled-components"
import { Attachment } from "../../attachment/components/Attachment"
import { Markdown } from "../../markdown/components/Markdown"
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
  position: relative;
  flex: 0 0 auto;

  ${({ theme }) =>
    theme.appearance.display === "cozy" &&
    css`
      margin-top: 1rem;
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

      text-indent: calc(-80px + 1rem);
    `}
`

const ExtrasContainer = styled.div`
  display: grid;
  grid-auto-flow: row;
  row-gap: 0.25rem;

  padding: 0.125rem 0;

  & > * {
    justify-self: start;
    align-self: start;
  }
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
        {((embeds?.length ?? 0) > 0 || files.length > 0) && (
          <ExtrasContainer>
            {[
              ...files.map(file => (
                <Attachment key={`file:${file.name}`} file={file} />
              )),
              ...getEmbedsWithGallery(embeds ?? []).map(embed => (
                <RichEmbed key={`embed:${embed[id]}`} embed={embed} />
              )),
            ]}
          </ExtrasContainer>
        )}
      </Container>
    </ScrollContainer>
  )
}
