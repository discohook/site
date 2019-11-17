import React, { useEffect } from "react"
import { SERVER } from "../core/environment"
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

  const type = getAttachmentType(name, mime)
  useEffect(() => {
    console.log(`Attachment type for ${name} (${mime || "no mime"}):`, type)
  }, [mime, name, type])

  if (!SERVER && file instanceof File && type === "image") {
    return <ImageAttachment file={file} />
  }

  if (type === "audio") {
    return <AudioAttachment file={file} />
  }

  return <DefaultAttachment file={file} type={type} />
}
