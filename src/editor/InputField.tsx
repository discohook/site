import React, { ChangeEvent } from "react"
import { InputLabel, MultilineTextInput, TextInput } from "./styles"

interface Props {
  value: string
  onChange: (value: string | undefined) => void
  label: string
  multiline?: true
  placeholder?: string
}

export default function InputField(props: Props) {
  const InputComponent = props.multiline ? MultilineTextInput : TextInput

  return (
    <InputLabel>
      {props.label}
      <InputComponent
        value={props.value}
        onChange={(
          event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        ) => props.onChange(event.target.value || undefined)}
        placeholder={props.placeholder}
      />
    </InputLabel>
  )
}
