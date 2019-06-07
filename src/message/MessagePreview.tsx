import styled from "@emotion/styled"
import React from "react"
import Attachment from "./Attachment"
import Markup, { MarkupContainer } from "./markup/Markup"
import { Message } from "./Message"
import MessageHeader from "./MessageHeader"
import RichEmbed from "./RichEmbed"

interface Props {
  message: Message
  files: FileList | undefined
}

const Container = styled.div`
  margin: ${(props) =>
    props.theme.display === "cozy" ? "0 0 0 80px" : "0 0 0 9ch"};
  padding: ${(props) =>
    props.theme.display === "cozy" ? "20px 10px 20px 0" : "10px"};

  font-size: 15px;
  line-height: 1.3;

  > ${MarkupContainer} {
    display: inline;
    margin-left: ${(props) => (props.theme.display === "cozy" ? "0" : "4px")};
  }

  > * + *:not(${MarkupContainer}) {
    margin-left: ${(props) => (props.theme.display === "cozy" ? "0" : "6px")};
  }
`

export default function MessagePreview(props: Props) {
  const { message, files: fileList } = props
  const { content, embeds, username, avatarUrl } = message
  const files = fileList && Array.from(fileList)

  return (
    <Container>
      <MessageHeader {...{ username, avatarUrl }} />
      {content && <Markup content={content} />}
      {embeds && embeds.map((embed, i) => <RichEmbed embed={embed} key={i} />)}
      {files && files.map((file, i) => <Attachment file={file} key={i} />)}
    </Container>
  )
}
