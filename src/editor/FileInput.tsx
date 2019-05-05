import React from "react"
import { Container, InputLabel, TextInput } from "./styles"

interface Props {
  onChange: (files: FileList | undefined) => void
}

export const FileInput = (props: Props) => (
  <Container>
    <InputLabel>Files</InputLabel>
    <TextInput
      type="file"
      onChange={(event) => props.onChange(event.target.files || undefined)}
    />
  </Container>
)
