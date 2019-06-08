import React, { ChangeEvent } from "react"
import { InputLabel, MultilineTextInput, TextInput } from "./styles"

interface Props {
  value: string
  onChange: (value: string | undefined) => void
  label: string
  multiline?: boolean
  placeholder?: string
}

type E = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export default function InputField(props: Props) {
  const Input = props.multiline ? MultilineTextInput : TextInput

  return (
    <InputLabel>
      {props.label}
      <Input
        value={props.value}
        onChange={(event: E) => props.onChange(event.target.value || undefined)}
        placeholder={props.placeholder}
      />
    </InputLabel>
  )
}
