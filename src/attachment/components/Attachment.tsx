import React, { useEffect } from "react"
import { FileLike } from "../../message/types/FileLike"
import { getAttachmentType } from "../helpers/getAttachmentType"
import { AudioAttachment } from "./AudioAttachment"
import { DefaultAttachment } from "./DefaultAttachment"
import { ImageAttachment } from "./ImageAttachment"

export type AttachmentProps = {
  file: File | FileLike
}

export function Attachment(props: AttachmentProps) {
  const { file } = props
  const { name, type: mime } = file

  const type = getAttachmentType(name, mime)
  useEffect(() => {
    console.log(`Attachment type for ${name} (${mime || "undefined"}):`, type)
  }, [mime, name, type])

  if (!SERVER && file instanceof File && type === "image") {
    return <ImageAttachment file={file} />
  }

  if (type === "audio") {
    return <AudioAttachment file={file} />
  }

  return <DefaultAttachment file={file} type={type} />
}
