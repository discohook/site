import React from "react"
import type { AttachmentLike } from "../../../state/models/AttachmentModel"
import type { AttachmentType } from "../AttachmentType"
import { getAttachmentIcon } from "../helpers/getAttachmentIcon"
import { getHumanReadableSize } from "../helpers/getHumanReadableSize"
import { download } from "../icons/download"
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
  file: AttachmentLike
  type: AttachmentType
}

export function DefaultAttachment(props: DefaultAttachmentProps) {
  const { file, type } = props
  const { filename, size } = file

  return (
    <AttachmentContainer>
      <AttachmentIconContainer>
        {getAttachmentIcon(type)}
      </AttachmentIconContainer>
      <AttachmentInfo>
        <AttachmentFileName>
          <AttachmentFileNameInner>{filename}</AttachmentFileNameInner>
        </AttachmentFileName>
        <AttachmentFileSize>{getHumanReadableSize(size)}</AttachmentFileSize>
      </AttachmentInfo>
      <AttachmentDownloadButton>{download}</AttachmentDownloadButton>
    </AttachmentContainer>
  )
}
