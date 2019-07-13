import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import { FakeFile } from "../editor/backup/Backup"
import AttachmentIcon from "./AttachmentIcon"
import { AttachmentIconType, attachmentTypes } from "./attachmentTypes"

interface Props {
  file: File | FakeFile
}

const ImageAttachment = styled.img`
  display: block;

  max-width: 400px;
  max-height: 300px;

  margin: 8px 0 0;
  border-radius: 3px;
  cursor: pointer;
`

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

const getAttachmentType = (name: string, mime: string): AttachmentIconType => {
  const types = attachmentTypes

  for (const type of types) {
    const regex = new RegExp(type.regex)
    if (regex.test(type.check === "name" ? name : mime)) {
      return type.icon
    }
  }

  return "unknown"
}

const getHumanReadableSize = (bytes: number) => {
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB"]

  let unit = 0
  let number = bytes

  while (number >= 1024 && unit < units.length - 1) {
    unit++
    number /= 1024
  }

  const formattedNumber = number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })

  return `${formattedNumber} ${units[unit]}`
}

export default function Attachment(props: Props) {
  const { file } = props
  const { name, size, type: mime } = file

  const [type, setType] = useState(getAttachmentType(name, mime))
  useEffect(() => setType(getAttachmentType(name, mime)), [name, mime])
  useEffect(() => console.log(`Attachment type for ${name}:`, type), [
    name,
    type,
  ])

  const isFile = file instanceof Blob

  const [objectUrl, setObjectUrl] = useState("")
  useEffect(() => {
    if (type !== "image" || !isFile) return

    const objectUrl = URL.createObjectURL(file)
    setObjectUrl(objectUrl)

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [file, isFile, type])

  if (type === "image" && isFile)
    return <ImageAttachment src={objectUrl} alt={name} />

  return (
    <AttachmentContainer>
      <AttachmentIconContainer>
        <AttachmentIcon type={type === "image" ? "unknown" : type} />
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
