import React from "react"
import styled from "styled-components"
import { getAttachmentIcon } from "../helpers/getAttachmentIcon"
import { getHumanReadableSize } from "../helpers/getHumanReadableSize"
import { download } from "../icons/download"
import { AudioControls } from "./AudioControls"
import {
  AttachmentContainer,
  AttachmentDownloadButton,
  AttachmentIconContainer,
} from "./styles"

const AudioContainer = styled(AttachmentContainer)`
  width: 400px;

  flex-direction: column;
  align-items: stretch;
  justify-content: space-between;
`

const AudioMetadata = styled.div`
  display: flex;
`

const AudioIconContainer = styled(AttachmentIconContainer)`
  width: 26px;
  height: 40px;

  margin: -4px 1px 0 -1px;

  & > svg {
    width: 26px;
    height: 40px;
  }
`

const AudioAttachmentInfo = styled.div`
  padding: 0 8px;
  flex: 1 1 auto;

  white-space: nowrap;
  overflow: hidden;
`

const AudioFileName = styled.span`
  color: ${({ theme }) => theme.text.link};

  font-size: 16px;
  line-height: 20px;
  font-weight: 500;

  text-decoration: none;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  &:hover {
    text-decoration: underline;
  }
`

const AudioFileSize = styled.div`
  color: ${({ theme }) => theme.text.muted};

  font-size: 12px;
  line-height: 16px;
  font-weight: 500;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  opacity: 0.7;
`

const AudioDownloadButton = styled(AttachmentDownloadButton)`
  flex: 0;

  & > svg {
    height: 25px;
  }
`

export type AudioAttachmentProps = {
  file: File
}

export function AudioAttachment(props: AudioAttachmentProps) {
  const { name, size } = props.file

  return (
    <AudioContainer>
      <AudioMetadata>
        <AudioIconContainer>{getAttachmentIcon("audio")}</AudioIconContainer>
        <AudioAttachmentInfo>
          <AudioFileName>{name}</AudioFileName>
          <AudioFileSize>{getHumanReadableSize(size)}</AudioFileSize>
        </AudioAttachmentInfo>
        <AudioDownloadButton>{download}</AudioDownloadButton>
      </AudioMetadata>
      <AudioControls />
    </AudioContainer>
  )
}
