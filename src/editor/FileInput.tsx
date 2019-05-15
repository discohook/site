import React from "react"
import { InputLabel, TextInput } from "./styles"

interface Props {
  onChange: (files: FileList | undefined) => void
}

export default function FileInput(props: Props) {
  return (
    <InputLabel>
      Files
      <TextInput
        type="file"
        onChange={(event) => props.onChange(event.target.files || undefined)}
      />
    </InputLabel>
  )
}
