import styled from "@emotion/styled"
import React from "react"
import Attachment from "../attachment/Attachment"
import { Theme } from "../core/themes"
import Markup from "../markup/Markup"
import { MarkupContainer } from "../markup/styles"
import { FileLike } from "../message/FileLike"
import { Message } from "../message/Message"
import { id } from "../message/uid"
import MessageHeader from "./MessageHeader"
import RichEmbed from "./RichEmbed"

const ScrollContainer = styled.div`
  overflow-y: scroll;
`

const Container = styled.div<{}, Theme>`
  margin: ${({ theme }) =>
    theme.display === "cozy" ? "0 0 0 80px" : "0 0 0 9ch"};
  padding: ${({ theme }) =>
    theme.display === "cozy" ? "20px 10px 20px 0" : "10px"};

  font-size: 16px;

  & > * + * {
    margin-left: ${({ theme }) => (theme.display === "cozy" ? "0" : "6px")};
  }

  & > ${MarkupContainer} {
    display: inline;
    margin-left: ${({ theme }) => (theme.display === "cozy" ? "0" : "4px")};
  }
`

type Props = {
  message: Message
  files: (File | FileLike)[]
}

export default function MessagePreview(props: Props) {
  const { message, files } = props
  const { content, embeds, username, avatarUrl } = message

  return (
    <ScrollContainer>
      <Container>
        <MessageHeader username={username} avatarUrl={avatarUrl} />
        {content && <Markup content={content} jumboable />}
        {embeds &&
          Array.from(embeds).map(embed => (
            <RichEmbed embed={embed} key={embed[id]} />
          ))}
        {files &&
          Array.from(files).map(file => (
            <Attachment file={file} key={file.name} />
          ))}
      </Container>
    </ScrollContainer>
  )
}
