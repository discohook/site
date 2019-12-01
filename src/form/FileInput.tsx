import styled from "@emotion/styled"
import React, { useRef } from "react"
import { SERVER } from "../core/environment"
import { Container } from "../editor/styles"
import { FileLike } from "../message/FileLike"
import {
  DefaultButton,
  InputContainer,
  InputLabel,
  InputNote,
  TextInput,
} from "./styles"

const maxFileSize = 8000000

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

const RemoveFilesButton = styled(DefaultButton)`
  margin-right: 0;
`

type Props = {
  files: readonly (File | FileLike)[]
  onChange: (files: readonly (File | FileLike)[]) => void
}

export default function FileInput(props: Props) {
  const { files, onChange: handleChange } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const handleRemoveFiles = () => {
    if (!inputRef.current) return

    inputRef.current.value = ""
    handleChange([])
  }

  const errors: string[] = []
  if (
    files.length > 0 &&
    (SERVER || !files.some(file => file instanceof File))
  ) {
    errors.push("files are unavailable")
  }
  const totalFileSize = files.reduce((total, file) => total + file.size, 0)
  if (totalFileSize > maxFileSize) {
    errors.push("files exceed maximum file size")
  }

  return (
    <InputContainer>
      <Container flow="row">
        <InputLabel htmlFor="file">Files</InputLabel>
        {errors.length > 0 && (
          <InputNote state="error">
            {errors.join(", ").replace(/^\w/, letter => letter.toUpperCase())}
          </InputNote>
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
