import React from "react"
import type { AttachmentLike } from "../../state/models/AttachmentModel"
import { AudioAttachment } from "./components/AudioAttachment"
import { DefaultAttachment } from "./components/DefaultAttachment"
import { ImageAttachment } from "./components/ImageAttachment"
import { getAttachmentType } from "./helpers/getAttachmentType"

export type AttachmentProps = {
  file: AttachmentLike
}

export function Attachment(props: AttachmentProps) {
  const { file } = props
  const { filename, contentType: mime } = file

  const type = getAttachmentType(filename, mime)

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
