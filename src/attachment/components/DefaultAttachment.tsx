import React from "react"
import { FileLike } from "../../message/types/FileLike"
import { getAttachmentIcon } from "../helpers/getAttachmentIcon"
import { getHumanReadableSize } from "../helpers/getHumanReadableSize"
import { download } from "../icons/download"
import { AttachmentType } from "../types/AttachmentType"
import {
  AttachmentContainer,
  AttachmentDownloadButton,
  AttachmentFileName,
  AttachmentFileNameInner,
  AttachmentFileSize,
  AttachmentIconContainer,
  AttachmentInfo,
} from "./styles"

export type DefaultAttachmentProps = {
  file: FileLike
  type: AttachmentType
}

export function DefaultAttachment(props: DefaultAttachmentProps) {
  const { file, type } = props
  const { name, size } = file

  return (
    <AttachmentContainer>
      <AttachmentIconContainer>
        {getAttachmentIcon(type)}
      </AttachmentIconContainer>
      <AttachmentInfo>
        <AttachmentFileName>
          <AttachmentFileNameInner>{name}</AttachmentFileNameInner>
        </AttachmentFileName>
        <AttachmentFileSize>{getHumanReadableSize(size)}</AttachmentFileSize>
      </AttachmentInfo>
      <AttachmentDownloadButton>{download}</AttachmentDownloadButton>
    </AttachmentContainer>
  )
}
