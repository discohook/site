import { useObserver } from "mobx-react-lite"
import { rem } from "polished"
import React from "react"
import styled, { css } from "styled-components"
import { Attachment } from "../../attachment/components/Attachment"
import { Markdown } from "../../markdown/components/Markdown"
import { MarkdownContainer } from "../../markdown/components/MarkdownContainer"
import { useStores } from "../../state/hooks/useStores"
import { MessageHeader } from "./MessageHeader"
import { RichEmbed } from "./RichEmbed"

const ScrollContainer = styled.div`
  overflow-y: scroll;
`

const Container = styled.div`
  position: relative;
  flex: 0 0 auto;

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

export function MessagePreview() {
  const { messageStore, webhookStore } = useStores()

  return useObserver(() => (
    <ScrollContainer>
      <Container>
        <MessageHeader
          username={webhookStore.displayName}
          avatarUrl={webhookStore.displayAvatarUrl}
        />
        {messageStore.message.content && (
          <Markdown
            content={messageStore.message.content}
            type="message-content"
          />
        )}
        {(messageStore.message.embeds.length > 0 ||
          messageStore.message.files.length > 0) && (
          <ExtrasContainer>
            {[
              ...messageStore.message.files.map(file => (
                <Attachment key={`file:${file.name}`} file={file} />
              )),
              ...messageStore.message.embeds.map(embed => (
                <RichEmbed key={`embed:${embed.id}`} embed={embed} />
              )),
            ]}
          </ExtrasContainer>
        )}
      </Container>
    </ScrollContainer>
  ))
}
