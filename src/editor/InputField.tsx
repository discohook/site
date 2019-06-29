import React, { ChangeEvent } from "react"
import { getUniqueId } from "../uid"
import {
  Container,
  InputLabel,
  InputNote,
  MultilineTextInput,
  TextInput,
} from "./styles"

interface Props {
  value?: string
  onChange: (value: string) => void
  label: string
  multiline?: boolean
  placeholder?: string
  maxLength?: number
}

type Event = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

export default function InputField(props: Props) {
  const {
    value,
    onChange: handleChange,
    label,
    multiline,
    placeholder,
    maxLength,
  } = props

  const id = getUniqueId()

  const Input = multiline ? MultilineTextInput : TextInput

  const state = !maxLength
    ? "normal"
    : (value || "").length / maxLength < 0.9
    ? "normal"
    : (value || "").length / maxLength > 1
    ? "error"
    : "warning"

  return (
    <Container>
      <InputLabel htmlFor={id}>
        {label}
        <Input
          id={id}
          value={value || ""}
          onChange={(event: Event) => handleChange(event.target.value)}
          placeholder={placeholder}
        />
      </InputLabel>
      {maxLength && (
        <InputNote state={state}>
          {(value || "").length} / {maxLength}
        </InputNote>
      )}
    </Container>
  )
}
