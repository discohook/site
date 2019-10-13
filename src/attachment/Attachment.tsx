import React, { useEffect, useState } from "react"
import { FileLike } from "../message/FileLike"
import AudioAttachment from "./AudioAttachment"
import DefaultAttachment from "./DefaultAttachment"
import { getAttachmentType } from "./getAttachmentType"
import ImageAttachment from "./ImageAttachment"

type Props = {
  file: File | FileLike
}

export default function Attachment(props: Props) {
  const { file } = props
  const { name, type: mime } = file

  const [type, setType] = useState(getAttachmentType(name, mime))
  useEffect(() => {
    setType(getAttachmentType(name, mime))
  }, [mime, name])
  useEffect(() => {
    console.log(`Attachment type for ${name}:`, type)
  }, [name, type])

  if (file instanceof File && type === "image") {
    return <ImageAttachment file={file} />
  }

  if (type === "audio") {
    return <AudioAttachment file={file} />
  }

  return <DefaultAttachment file={file} type={type} />
}
