import React, { forwardRef, Ref } from "react"
import { InputLabel, TextInput } from "./styles"

interface Props {
  onChange: (files: FileList | undefined) => void
}

function FileInput(props: Props, ref: Ref<HTMLInputElement>) {
  return (
    <InputLabel>
      Files
      <TextInput
        type="file"
        onChange={(event) => props.onChange(event.target.files || undefined)}
        ref={ref}
      />
    </InputLabel>
  )
}

export default forwardRef(FileInput)
