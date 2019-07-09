import styled from "@emotion/styled"
import React from "react"
import { id } from "../uid"
import Attachment from "./Attachment"
import Markup from "./markup/Markup"
import { MarkupContainer } from "./markup/styles"
import { Message } from "./Message"
import MessageHeader from "./MessageHeader"
import RichEmbed from "./RichEmbed"

interface Props {
  message: Message
  files: FileList | undefined
}

const Container = styled.div`
  margin: ${({ theme }) =>
    theme.display === "cozy" ? "0 0 0 80px" : "0 0 0 9ch"};
  padding: ${({ theme }) =>
    theme.display === "cozy" ? "20px 10px 20px 0" : "10px"};

  font-size: 15px;
  line-height: 1.3;

  & > * + * {
    margin-left: ${({ theme }) => (theme.display === "cozy" ? "0" : "6px")};
  }

  & > ${MarkupContainer} {
    display: inline;
    margin-left: ${({ theme }) => (theme.display === "cozy" ? "0" : "4px")};
  }
`

export default function MessagePreview(props: Props) {
  const { message, files: fileList } = props
  const { content, embeds, username, avatarUrl } = message
  const files = fileList && Array.from(fileList)

  return (
    <Container>
      <MessageHeader username={username} avatarUrl={avatarUrl} />
      {content && <Markup content={content} />}
      {embeds &&
        embeds.map((embed) => <RichEmbed embed={embed} key={embed[id]} />)}
      {files && files.map((file, i) => <Attachment file={file} key={i} />)}
    </Container>
  )
}
