import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"
import DefaultAttachment from "./DefaultAttachment"

interface Props {
  file: File
}

const Image = styled.img`
  display: block;

  max-width: 400px;
  max-height: 300px;

  margin: 8px 0 0;
  border-radius: 3px;
  cursor: pointer;
`

export default function ImageAttachment(props: Props) {
  const { file } = props

  const [objectUrl, setObjectUrl] = useState("")
  useEffect(() => {
    const objectUrl = URL.createObjectURL(file)
    setObjectUrl(objectUrl)

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl)
    }
  }, [file])

  const [errored, setErrored] = useState(false)
  useEffect(() => setErrored(false), [objectUrl])

  return !errored ? (
    <Image src={objectUrl} alt={name} onError={() => setErrored(true)} />
  ) : (
    <DefaultAttachment file={file} type="image" />
  )
}
