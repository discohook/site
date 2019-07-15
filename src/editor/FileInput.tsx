import styled from "@emotion/styled"
import React, {
  forwardRef,
  Ref,
  useImperativeHandle,
  useMemo,
  useRef,
} from "react"
import { getUniqueId } from "../uid"
import { FakeFile } from "./backup/Backup"
import { InputLabel, TextInput } from "./styles"

interface Props {
  onChange: (files: FileList | FakeFile[]) => void
}

interface RefType {
  files: FileList | FakeFile[]
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
    props.onChange([])
  }

  useImperativeHandle(ref, () => ({
    files: (inputRef.current && inputRef.current.files) || [],
    clearFiles,
  }))

  const id = useMemo(getUniqueId, [])

  return (
    <InputLabel htmlFor={id}>
      Files
      <Input
        id={id}
        onClick={clearFiles}
        onChange={event => props.onChange(event.target.files || [])}
        type="file"
        multiple={true}
        ref={inputRef}
      />
    </InputLabel>
  )
}

export default forwardRef(FileInput)
