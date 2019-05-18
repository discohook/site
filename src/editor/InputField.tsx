import React from "react"
import { InputLabel, TextInput } from "./styles"

interface Props {
  value: string
  onChange: (value: string | undefined) => void
  label: string
  multiline?: true
  placeholder?: string
}

export default function InputField(props: Props) {
  return (
    <InputLabel>
      {props.label}
      <TextInput
        as={props.multiline && "textarea"}
        value={props.value}
        onChange={(event) => props.onChange(event.target.value || undefined)}
        placeholder={props.placeholder}
      />
    </InputLabel>
  )
}
