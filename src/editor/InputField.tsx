import React from "react"
import { InputLabel, TextInput } from "./styles"

interface Props {
  value: string
  onChange: (value: string | undefined) => void
  label: string
  multiline?: true
}

export const InputField = (props: Props) => (
  <InputLabel>
    {props.label}
    <TextInput
      as={props.multiline && "textarea"}
      value={props.value}
      onChange={(event) => props.onChange(event.target.value || undefined)}
    />
  </InputLabel>
)
