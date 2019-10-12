import styled from "@emotion/styled"
import React, { useRef } from "react"
import { FileLike } from "../backup/Backup"
import { Button, Container, InputLabel, InputNote, TextInput } from "./styles"

const InputContainer = styled.div`
  position: relative;
  margin: 0 8px;
`

const FakeInput = styled(TextInput.withComponent("div"))`
  position: absolute;

  height: 32px;
  width: 100%;
`

const HiddenInput = styled.input`
  position: absolute;
  top: 8px;

  height: 32px;
  width: 100%;

  opacity: 0;
`

type Props = {
  files: (File | FileLike)[]
  onChange: (files: (File | FileLike)[]) => void
}

export default function FileInput(props: Props) {
  const { files, onChange: handleChange } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const clearFiles = () => {
    if (!inputRef.current) return

    inputRef.current.value = ""
    handleChange([])
  }

  const fakeFiles = () => {
    const fakeFiles = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }))

    handleChange(fakeFiles)
  }

  const filesAvailable =
    files.length === 0 ||
    files.every(f => !process.env.SSR && f instanceof File)

  return (
    <Container>
      <InputLabel htmlFor="file">Files</InputLabel>
      <Container direction="row">
        <InputContainer>
          <FakeInput>{files.map(file => file.name).join(", ")}</FakeInput>
          <HiddenInput
            id="file"
            type="file"
            multiple
            onClick={() => fakeFiles()}
            onChange={event =>
              handleChange(Array.from(event.target.files || []))
            }
            ref={inputRef}
          />
        </InputContainer>
        <Button onClick={clearFiles}>Remove files</Button>
      </Container>
      {!filesAvailable && (
        <InputNote state="error">Files are unavailable</InputNote>
      )}
    </Container>
  )
}
