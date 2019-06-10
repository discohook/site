import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import AttachmentIcon, { AttachmentType } from "./AttachmentIcon"
import attachmentTypes from "./attachmentTypes.json"

interface Props {
  file: File
}

const getHumanReadableSize = (bytes: number) => {
  const units = ["bytes", "KB", "MB"]

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

  :hover {
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

  :hover {
    color: ${({ theme }) => theme.message.attachment.downloadHover};
  }

  > svg {
    fill: currentColor;
  }
`

interface AttachmentTypeInfo {
  check: "mime" | "name"
  regex: string
  icon: AttachmentType
}

const getAttachmentType = (name: string, mime: string): AttachmentType => {
  const types = attachmentTypes as AttachmentTypeInfo[]

  for (const type of types) {
    const regex = new RegExp(type.regex)
    if (regex.test(type.check === "name" ? name : mime)) {
      return type.icon
    }
  }

  return "unknown"
}

const readAsBase64 = (blob: Blob) => {
  return new Promise<string>((res, rej) => {
    const reader = new FileReader()
    reader.addEventListener("load", () => res(reader.result as string))
    reader.addEventListener("error", rej)
    reader.addEventListener("abort", rej)
    reader.readAsDataURL(blob)
  })
}

export default function Attachment(props: Props) {
  const { name, size, type: mime } = props.file

  const [type, setType] = useState(getAttachmentType(name, mime))
  useEffect(() => {
    setType(getAttachmentType(name, mime))
  }, [name, mime])
  useEffect(() => {
    console.log(`Attachment type for ${name}:`, type)
  }, [type])

  const [dataUrl, setDataUrl] = useState("")
  useEffect(() => {
    if (type === "image") readAsBase64(props.file).then(setDataUrl)
    else setDataUrl("")
  }, [props.file])

  if (type === "image") return <ImageAttachment src={dataUrl} alt={name} />

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
        <svg width={24} height={24} viewBox="0 0 24 24">
          <path d="M19,9h-4V3H9v6H5l7,7,7-7zM5,18v2h14v-2H5z" />
        </svg>
      </AttachmentDownloadButton>
    </AttachmentContainer>
  )
}
