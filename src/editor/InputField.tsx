import React from "react"
import {
  Container,
  InputContainer,
  InputLabel,
  InputNote,
  MultilineTextInput,
  TextInput,
} from "./styles"

type Props = {
  id: string
  value: string | undefined
  onChange: (value: string) => void
  label: string
  type?: string
  placeholder?: string
  maxLength?: number
}

export default function InputField(props: Props) {
  const {
    id,
    value = "",
    onChange: handleChange,
    label,
    type,
    placeholder,
    maxLength,
  } = props

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
      {type === "multiline" ? (
        <MultilineTextInput
          id={id}
          value={value}
          onChange={event => handleChange(event.target.value)}
          placeholder={placeholder}
        />
      ) : (
        <TextInput
          id={id}
          value={value}
          onChange={event => handleChange(event.target.value)}
          type={type}
          placeholder={placeholder}
        />
      )}
    </InputContainer>
  )
}
