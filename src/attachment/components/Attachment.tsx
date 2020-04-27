import React from "react"
import { getAttachmentType } from "../helpers/getAttachmentType"
import { AudioAttachment } from "./AudioAttachment"
import { DefaultAttachment } from "./DefaultAttachment"
import { ImageAttachment } from "./ImageAttachment"

export type AttachmentProps = {
  file: File
}

export function Attachment(props: AttachmentProps) {
  const { file } = props
  const { name, type: mime } = file

  const type = getAttachmentType(name, mime)

  switch (type) {
    case "image": {
      return <ImageAttachment file={file} />
    }
    case "audio": {
      return <AudioAttachment file={file} />
    }
    default: {
      return <DefaultAttachment file={file} type={type} />
    }
  }
}
