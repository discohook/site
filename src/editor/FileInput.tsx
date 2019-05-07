import React from "react"
import { InputLabel, TextInput } from "./styles"

interface Props {
  onChange: (files: FileList | undefined) => void
}

export const FileInput = (props: Props) => (
  <InputLabel>
    Files
    <TextInput
      type="file"
      onChange={(event) => props.onChange(event.target.files || undefined)}
    />
  </InputLabel>
)
