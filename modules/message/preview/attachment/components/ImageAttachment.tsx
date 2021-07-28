import React, { useLayoutEffect, useState } from "react"
import styled from "styled-components"
import type { AttachmentLike } from "../../../state/models/AttachmentModel"
import { DefaultAttachment } from "./DefaultAttachment"

const Image = styled.img`
  display: block;

  max-width: 400px;
  max-height: 300px;

  border-radius: 3px;
  cursor: pointer;
`

export type ImageAttachmentProps = {
  file: AttachmentLike
}

export function ImageAttachment(props: ImageAttachmentProps) {
  const { file } = props

  // const [objectUrl, setObjectUrl] = useState("")
  // useLayoutEffect(() => {
  //   const objectUrl = URL.createObjectURL(file)
  //   setObjectUrl(objectUrl)

  //   return () => {
  //     if (objectUrl) URL.revokeObjectURL(objectUrl)
  //   }
  // }, [file])

  // const [errored, setErrored] = useState(false)
  // useLayoutEffect(() => setErrored(false), [objectUrl])

  // if (errored) {
  //   return <DefaultAttachment file={file} type="image" />
  // }

  return (
    <Image src={file.url} alt={file.filename} /* onError={() => setErrored(true)}  */ />
  )
}
