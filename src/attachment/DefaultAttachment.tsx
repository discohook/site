import React from "react"
import { FileLike } from "../backup/Backup"
import AttachmentIcon from "./AttachmentIcon"
import { AttachmentIconType } from "./attachmentTypes"
import { getHumanReadableSize } from "./getHumanReadableSize"
import {
  Container,
  DownloadButton,
  FileName,
  FileNameInner,
  FileSize,
  IconContainer,
  Info,
} from "./styles"

type Props = {
  file: FileLike
  type: AttachmentIconType
}

export default function DefaultAttachment(props: Props) {
  const { name, size } = props.file
  const type = props.type === "image" ? "unknown" : props.type

  return (
    <Container>
      <IconContainer>
        <AttachmentIcon type={type} />
      </IconContainer>
      <Info>
        <FileName>
          <FileNameInner>{name}</FileNameInner>
        </FileName>
        <FileSize>{getHumanReadableSize(size)}</FileSize>
      </Info>
      <DownloadButton>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M19,9h-4V3H9v6H5l7,7,7-7zM5,18v2h14v-2H5z" />
        </svg>
      </DownloadButton>
    </Container>
  )
}
