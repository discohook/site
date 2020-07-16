import React from "react"
import { FlexContainer } from "../../modules/editor/styles/FlexContainer"
import { InputContainer } from "./styles/InputContainer"
import { InputLabel } from "./styles/InputLabel"
import { InputNote } from "./styles/InputNote"
import { MultilineTextInput } from "./styles/MultilineTextInput"
import { TextInput } from "./styles/TextInput"

export type InputFieldProps = {
  id: string
  value: string
  onChange: (value: string) => void
  label: string
  type?: string
  placeholder?: string
  required?: boolean
  maxLength?: number
  validate?: (value: string) => string | undefined
}

export function InputField(props: InputFieldProps) {
  const {
    id,
    value,
    onChange: handleChange,
    label,
    type,
    placeholder,
    required,
    maxLength,
    validate,
  } = props

  const customError = value ? validate?.(value) : undefined

  let lengthState: "normal" | "warning" | "error" = "normal"
  if (value.length / (maxLength ?? 0) > 0.9) lengthState = "warning"
  if (value.length / (maxLength ?? 0) > 1) lengthState = "error"

  const notes = [
    customError && {
      id: "custom",
      state: "error",
      value: customError,
    },
    maxLength && {
      id: "length",
      state: lengthState,
      value: `${value.length} / ${maxLength}`,
    },
    required && {
      id: "required",
      state: value ? "normal" : "error",
      value: "Required",
    },
  ].filter(Boolean) as {
    id: string
    state: "normal" | "warning" | "error"
    value: string
  }[]

  return (
    <InputContainer>
      <FlexContainer flow="row">
        <InputLabel htmlFor={id}>{label}</InputLabel>
        {notes.map((note, index, array) => (
          <InputNote key={note.id} state={note.state}>
            {note.value}
            {index < array.length - 1 && ", "}
          </InputNote>
        ))}
      </FlexContainer>
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
