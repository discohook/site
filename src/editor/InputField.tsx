import React, { ChangeEvent } from "react"
import {
  Container,
  InputContainer,
  InputLabel,
  InputNote,
  MultilineTextInput,
  TextInput,
} from "./styles"

type Event = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>

type Props = {
  id: string
  value: string | undefined
  onChange: (value: string) => void
  label: string
  type?: string
  multiline?: boolean
  placeholder?: string
  maxLength?: number
}

export default function InputField(props: Props) {
  const {
    id,
    onChange: handleChange,
    label,
    type,
    multiline,
    placeholder,
    maxLength,
  } = props
  const value = props.value || ""

  const Input = multiline ? MultilineTextInput : TextInput

  let state: "normal" | "warning" | "error" = "normal"
  if (value.length / (maxLength || 0) > 0.9) state = "warning"
  if (value.length / (maxLength || 0) > 1) state = "error"

  return (
    <InputContainer>
      <Container flow="row">
        <InputLabel htmlFor={id}>{label}</InputLabel>
        {maxLength && (
          <InputNote
            state={state}
            data-testid="input-length"
            data-teststate={state}
          >
            {value.length} / {maxLength}
          </InputNote>
        )}
      </Container>
      <Input
        id={id}
        value={value}
        onChange={(event: Event) => handleChange(event.target.value)}
        type={type}
        placeholder={placeholder}
      />
    </InputContainer>
  )
}
