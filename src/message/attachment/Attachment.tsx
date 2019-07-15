import React, { useEffect, useState } from "react"
import { FakeFile } from "../../editor/backup/Backup"
import DefaultAttachment from "./DefaultAttachment"
import { getAttachmentType } from "./getAttachmentType"
import ImageAttachment from "./ImageAttachment"

interface Props {
  file: File | FakeFile
}

export default function Attachment(props: Props) {
  const { file } = props
  const { name, type: mime } = file

  const [type, setType] = useState(getAttachmentType(name, mime))
  useEffect(() => {
    setType(getAttachmentType(name, mime))
  }, [name, mime])
  useEffect(() => {
    console.log(`Attachment type for ${name}:`, type)
  }, [name, type])

  if (file instanceof File && type === "image") {
    return <ImageAttachment file={file} />
  }

  return <DefaultAttachment file={file} type={type} />
}
