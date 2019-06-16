import React, { ChangeEvent } from "react"
import { InputLabel, MultilineTextInput, TextInput } from "./styles"

interface Props {
  value: string
  onChange: (value: string) => void
  label: string
  multiline?: boolean
  placeholder?: string
}

let nextId = 1
export const getUniqueId = () => `uid-${nextId++}`

type Event = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export default function InputField(props: Props) {
  const { value, onChange: handleChange, label, multiline, placeholder } = props

  const id = getUniqueId()

  const Input = multiline ? MultilineTextInput : TextInput

  return (
    <InputLabel htmlFor={id}>
      {label}
      <Input
        id={id}
        value={value || ""}
        onChange={(event: Event) => handleChange(event.target.value)}
        placeholder={placeholder}
      />
    </InputLabel>
  )
}
