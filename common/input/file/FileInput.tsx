import React, { useRef } from "react"
import styled, { useTheme } from "styled-components"
import { FlexContainer } from "../../../modules/editor/styles/FlexContainer"
import { Button } from "../Button"
import { InputContainer } from "../styles/InputContainer"
import { InputLabel } from "../styles/InputLabel"
import { InputNote } from "../styles/InputNote"
import { TextInput } from "../styles/TextInput"
import { PasteFileButton } from "./PasteFileButton"

const Container = styled(InputContainer)`
  position: relative;
  margin-right: 0;
`

const FileInputContainer = styled.div`
  position: relative;
  margin: 0 8px 0 0;
`

const FakeInput = styled(TextInput.withComponent("div"))`
  position: absolute;

  height: 32px;
  width: 100%;

  ${FileInputContainer}:focus-within > & {
    box-shadow: ${({ theme }) => theme.elavation.low};
  }
`

const HiddenInput = styled.input.attrs({ type: "file", multiple: true })`
  position: absolute;
  top: 8px;

  height: 32px;
  width: 100%;

  opacity: 0;
`

const MAX_FILE_SIZE = 8000000

export type FileInputProps = {
  id: string
  files: readonly File[]
  onChange: (files: File[]) => void
}

export function FileInput(props: FileInputProps) {
  const { id, files, onChange: handleChange } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const handleRemoveFiles = () => {
    if (!inputRef.current) return

    inputRef.current.value = ""
    handleChange([])
  }

  const theme = useTheme()

  const errors: string[] = []
  if (
    files.length > 0 &&
    (typeof window === "undefined" || !files.some(file => file instanceof File))
  ) {
    errors.push("files are unavailable")
  }
  const totalFileSize = files.reduce((total, file) => total + file.size, 0)
  if (totalFileSize > MAX_FILE_SIZE) {
    errors.push("files exceed maximum file size")
  }

  return (
    <Container>
      <FlexContainer flow="row">
        <InputLabel htmlFor={id}>Files (max 8MB)</InputLabel>
        {errors.length > 0 && (
          <InputNote state="error">
            {errors.join(", ").replace(/^\w/, letter => letter.toUpperCase())}
          </InputNote>
        )}
      </FlexContainer>
      <FlexContainer flow="row">
        <FileInputContainer>
          <FakeInput>{files.map(file => file.name).join(", ")}</FakeInput>
          <HiddenInput
            id={id}
            onChange={event => {
              handleChange(Array.from(event.target.files ?? []))
            }}
            ref={inputRef}
          />
        </FileInputContainer>
        {!theme.appearance.mobile && (
          <PasteFileButton onChange={handleChange} />
        )}
        <Button onClick={handleRemoveFiles}>Remove files</Button>
      </FlexContainer>
    </Container>
  )
}
