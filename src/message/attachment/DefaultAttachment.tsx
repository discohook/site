import styled from "@emotion/styled"
import React from "react"
import { FakeFile } from "../../editor/backup/Backup"
import AttachmentIcon from "./AttachmentIcon"
import { AttachmentIconType } from "./attachmentTypes"
import { getHumanReadableSize } from "./getHumanReadableSize"

interface Props {
  file: File | FakeFile
  type: AttachmentIconType
}

const AttachmentContainer = styled.div`
  width: 100%;
  max-width: 520px;

  margin: 8px 0 0;
  padding: 10px;

  display: flex;
  align-items: center;

  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.message.attachment.border};
  border-radius: 3px;

  background: ${({ theme }) => theme.message.attachment.background};
`

const AttachmentIconContainer = styled.div`
  width: 30px;
  height: 40px;
  margin: 0 8px 0 0;

  display: flex;
  align-items: center;
  justify-content: center;
`

const AttachmentInfo = styled.div`
  flex: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const AttachmentFileName = styled.div`
  line-height: 16px;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const AttachmentFileNameInner = styled.span`
  color: ${({ theme }) => theme.message.attachment.fileName};
  font-size: 16px;

  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`

const AttachmentFileSize = styled.div`
  color: ${({ theme }) => theme.message.attachment.fileSize};
  font-size: 12px;
  line-height: 16px;
  font-weight: 300;
`

const AttachmentDownloadButton = styled.div`
  cursor: pointer;

  color: ${({ theme }) => theme.message.attachment.download};

  &:hover {
    color: ${({ theme }) => theme.message.attachment.downloadHover};
  }

  & > svg {
    fill: currentColor;
  }
`

export default function DefaultAttachment(props: Props) {
  const { name, size } = props.file
  const type = props.type === "image" ? "unknown" : props.type

  return (
    <AttachmentContainer>
      <AttachmentIconContainer>
        <AttachmentIcon type={type} />
      </AttachmentIconContainer>
      <AttachmentInfo>
        <AttachmentFileName>
          <AttachmentFileNameInner>{name}</AttachmentFileNameInner>
        </AttachmentFileName>
        <AttachmentFileSize>{getHumanReadableSize(size)}</AttachmentFileSize>
      </AttachmentInfo>
      <AttachmentDownloadButton>
        <svg width="24" height="24" viewBox="0 0 24 24">
          <path d="M19,9h-4V3H9v6H5l7,7,7-7zM5,18v2h14v-2H5z" />
        </svg>
      </AttachmentDownloadButton>
    </AttachmentContainer>
  )
}
