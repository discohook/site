import styled from "@emotion/styled"
import React, { forwardRef, Ref, useImperativeHandle, useRef } from "react"
import { InputLabel, TextInput } from "./styles"

interface Props {
  onChange: (files: FileList | undefined) => void
}

interface RefType {
  files: FileList | undefined
  clearFiles: () => void
}

const Input = styled(TextInput)`
  padding: 4px 8px;
`

function FileInput(props: Props, ref: Ref<RefType>) {
  const inputRef = useRef<HTMLInputElement>(null)

  const clearFiles = () => {
    if (!inputRef.current) return

    inputRef.current.value = ""
    props.onChange(undefined)
  }

  useImperativeHandle(ref, () => ({
    files: (inputRef.current && inputRef.current.files) || undefined,
    clearFiles,
  }))

  return (
    <InputLabel>
      Files
      <Input
        type="file"
        multiple={true}
        onClick={clearFiles}
        onChange={(event) => props.onChange(event.target.files || undefined)}
        ref={inputRef}
      />
    </InputLabel>
  )
}

export default forwardRef(FileInput)
