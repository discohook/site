import React from "react"
import styled from "styled-components"
import { getAttachmentIcon } from "../helpers/getAttachmentIcon"
import { getHumanReadableSize } from "../helpers/getHumanReadableSize"
import { download } from "../icons/download"
import { AudioControls } from "./AudioControls"
import {
  AttachmentContainer,
  AttachmentDownloadButton,
  AttachmentFileName,
  AttachmentFileNameInner,
  AttachmentFileSize,
  AttachmentIconContainer,
  AttachmentInfo,
} from "./styles"

const AudioContainer = styled(AttachmentContainer)`
  flex-direction: column;
  width: 400px;

  font-size: 16px;
`

const AudioMetadata = styled.div`
  display: flex;

  margin: 2px 0 0;

  width: 378px;
  height: 40.5px;
`

const AudioIconContainer = styled(AttachmentIconContainer)`
  margin: -4px 15px 0 -3px;
`

const AudioFileNameInner = styled(AttachmentFileNameInner)`
  font-weight: 500;

  opacity: 1;
`

const AudioFileSize = styled(AttachmentFileSize)`
  margin: 3px 0 0;

  font-weight: 500;
`

const AudioDownloadButton = styled(AttachmentDownloadButton)`
  align-self: flex-start;
  margin: -2px 0 0;

  display: flex;
  align-items: center;

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
        <AttachmentInfo>
          <AttachmentFileName>
            <AudioFileNameInner>{name}</AudioFileNameInner>
          </AttachmentFileName>
          <AudioFileSize>{getHumanReadableSize(size)}</AudioFileSize>
        </AttachmentInfo>
        <AudioDownloadButton>{download}</AudioDownloadButton>
      </AudioMetadata>
      <AudioControls />
    </AudioContainer>
  )
}
