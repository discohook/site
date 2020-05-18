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
    maxLength,
    validate,
  } = props

  let state: "normal" | "warning" | "error" = "normal"
  if (value.length / (maxLength ?? 0) > 0.9) state = "warning"
  if (value.length / (maxLength ?? 0) > 1) state = "error"

  const error = value ? validate?.(value) : undefined

  return (
    <InputContainer>
      <FlexContainer flow="row">
        <InputLabel htmlFor={id}>{label}</InputLabel>
        {error && (
          <InputNote state="error">
            {error}
            {maxLength && ", "}
          </InputNote>
        )}
        {maxLength && (
          <InputNote state={state}>
            {value.length} / {maxLength}
          </InputNote>
        )}
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
