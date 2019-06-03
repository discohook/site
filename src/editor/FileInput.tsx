import React, { forwardRef, Ref, useImperativeHandle, useRef } from "react"
import { InputLabel, TextInput } from "./styles"

interface Props {
  onChange: (files: FileList | undefined) => void
}

interface RefType {
  files: FileList | undefined
  clearFiles: () => void
}

function FileInput(props: Props, ref: Ref<RefType>) {
  const inputRef = useRef<HTMLInputElement>(null)

  useImperativeHandle(ref, () => ({
    files: (inputRef.current && inputRef.current.files) || undefined,
    clearFiles: () => {
      if (inputRef.current) inputRef.current.value = ""
    },
  }))

  return (
    <InputLabel>
      Files
      <TextInput
        type="file"
        multiple={true}
        onChange={(event) => props.onChange(event.target.files || undefined)}
        ref={inputRef}
      />
    </InputLabel>
  )
}

export default forwardRef(FileInput)
