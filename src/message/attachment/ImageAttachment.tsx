import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"

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

  return <Image src={objectUrl} alt={name} />
}
