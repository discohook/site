import styled from "@emotion/styled"
import React, { useRef } from "react"
import { FakeFile } from "./backup/Backup"
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
  files: FileList | FakeFile[]
  onChange: (files: FileList | FakeFile[]) => void
}

export default function FileInput(props: Props) {
  const { files: fileList, onChange: handleChange } = props
  const files = Array.from(fileList)

  const inputRef = useRef<HTMLInputElement>(null)

  const clearFiles = () => {
    if (!inputRef.current) return

    inputRef.current.value = ""
    props.onChange([])
  }

  const fakeFiles = () => {
    const fakeFiles = files.map(file => ({
      name: file.name,
      type: file.type,
      size: file.size,
    }))

    handleChange(fakeFiles)
  }

  const isFileList =
    !process.env.SSR && (fileList instanceof FileList || files.length === 0)

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
            onChange={event => handleChange(event.target.files || [])}
            ref={inputRef}
          />
        </InputContainer>
        <Button onClick={clearFiles}>Remove files</Button>
      </Container>
      {!isFileList && (
        <InputNote state="error">Files are unavailable</InputNote>
      )}
    </Container>
  )
}
