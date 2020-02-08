import React from "react"
import styled from "styled-components"
import { FileLike } from "../../message/types/FileLike"
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

export const AudioContainer = styled(AttachmentContainer)`
  flex-direction: column;
  width: 400px;
`

export const AudioMetadata = styled.div`
  display: flex;

  margin: 2px 0 0;

  width: 378px;
  height: 40.5px;
`

export const AudioIconContainer = styled(AttachmentIconContainer)`
  margin: -4px 15px 0 -3px;
`

export const AudioFileNameInner = styled(AttachmentFileNameInner)`
  font-weight: 500;
`

export const AudioFileSize = styled(AttachmentFileSize)`
  margin: 2px 0 0;
  font-weight: 400;
`

export const AudioDownloadButton = styled(AttachmentDownloadButton)`
  align-self: flex-start;
  margin: -2px 0 0;

  display: flex;
  height: 25px;
  align-items: center;

  & > svg {
    height: 25px;
  }
`

export type AudioAttachmentProps = {
  file: FileLike
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
