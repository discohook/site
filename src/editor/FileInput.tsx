import styled from "@emotion/styled"
import React, { useRef } from "react"
import { SERVER } from "../core/environment"
import { FileLike } from "../message/FileLike"
import {
  Button,
  Container,
  InputContainer,
  InputLabel,
  InputNote,
  TextInput,
} from "./styles"

const FileInputContainer = styled.div`
  position: relative;
  margin: 0 8px 0 0;
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
HiddenInput.defaultProps = { type: "file", multiple: true }

const RemoveFilesButton = styled(Button)`
  margin: 8px 0 8px 8px;
`

type Props = {
  files: (File | FileLike)[]
  onChange: (files: (File | FileLike)[]) => void
}

export default function FileInput(props: Props) {
  const { files, onChange: handleChange } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const handleRemoveFiles = () => {
    if (!inputRef.current) return

    inputRef.current.value = ""
    handleChange([])
  }

  const filesAvailable = files.every(file => !SERVER && file instanceof File)

  return (
    <InputContainer>
      <Container flow="row">
        <InputLabel htmlFor="file">Files</InputLabel>
        {!filesAvailable && (
          <InputNote state="error">Files are unavailable</InputNote>
        )}
      </Container>
      <Container flow="row">
        <FileInputContainer>
          <FakeInput>{files.map(file => file.name).join(", ")}</FakeInput>
          <HiddenInput
            id="file"
            onChange={event => handleChange([...event.target.files])}
            ref={inputRef}
          />
        </FileInputContainer>
        <RemoveFilesButton onClick={handleRemoveFiles}>
          Remove files
        </RemoveFilesButton>
      </Container>
    </InputContainer>
  )
}
