import { Observer, useObserver } from "mobx-react-lite"
import dynamic from "next/dynamic"
import { rem } from "polished"
import React from "react"
import styled, { css } from "styled-components"
import { SCREEN_SMALL } from "../../../common/layout/breakpoints"
import { getTextDirection } from "../../markdown/helpers/getTextDirection"
import { Markdown } from "../../markdown/Markdown"
import { MarkdownContainer } from "../../markdown/styles/MarkdownContainer"
import type { MessageLike } from "../state/models/MessageModel"
import type { AttachmentProps } from "./attachment/Attachment"
import { MessageHeader } from "./MessageHeader"
import { RichEmbed } from "./RichEmbed"

const Attachment = dynamic<AttachmentProps>(async () =>
  import("./attachment/Attachment").then(module => module.Attachment),
)

const Container = styled.div`
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

      ${SCREEN_SMALL} {
        padding-left: 16px;
      }
    `};

  ${({ theme }) =>
    theme.appearance.display === "compact" &&
    css`
      padding: ${rem(2)} ${rem(16)} ${rem(2)} 80px;

      min-height: ${rem(22)};

      text-indent: calc(${rem(16)} - 80px);

      & > ${MarkdownContainer} {
        text-indent: 0;
        display: inline;
      }
    `};
`

const Content = styled(Markdown) <{ direction: "neutral" | "ltr" | "rtl" }>`
  ${({ theme, direction }) =>
    theme.appearance.display === "cozy" &&
    direction === "rtl" &&
    css`
      & > ${MarkdownContainer} {
        text-indent: 0;
        text-align: left;
        unicode-bidi: plaintext;
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
  message: MessageLike
}

export function MessagePreview(props: MessagePreviewProps) {
  const { message } = props

  return useObserver(() => (
    <Container>
      <MessageHeader
        username={message.username}
        avatarUrl={message.avatar}
        timestamp={message.timestamp}
        badge={message.badge}
      />
      {message.hasContent && (
        <Observer>
          {() => (
            <Content
              direction={getTextDirection(message.content)}
              content={message.content}
              type="message-content"
            />
          )}
        </Observer>
      )}
      {message.hasExtras && (
        <ExtrasContainer>
          {[
            ...message.attachments.map(attachment => (
              <Attachment
                key={`Attachment ${attachment.id} ${attachment.filename}`}
                file={attachment}
              />
            )),
            ...message.embeds.map(embed => (
              <RichEmbed key={`Embed ${embed.id}`} embed={embed} />
            )),
          ]}
        </ExtrasContainer>
      )}
    </Container>
  ))
}
