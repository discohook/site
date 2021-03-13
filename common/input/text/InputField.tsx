import React, { ChangeEvent, FocusEvent, forwardRef, ReactNode } from "react"
import styled from "styled-components"
import { FlexContainer } from "../../layout/FlexContainer"
import type { ReactRef } from "../../state/ReactRef"
import { InputError } from "../error/InputError"
import { getLengthConstraintColor } from "../getLengthConstraintColor"
import { Input } from "../layout/Input"
import { InputConstraint } from "../layout/InputConstraint"
import { InputContainer } from "../layout/InputContainer"
import { InputLabel } from "../layout/InputLabel"

const TextInput = styled(Input)`
  ${FlexContainer} > & {
    flex: 1;
  }
`

type InputChangeEvent = ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
type InputFocusEvent = FocusEvent<HTMLInputElement | HTMLTextAreaElement>

export type InputFieldProps = {
  id: string
  value: string
  onChange: (value: string) => void
  label: string
  hideLabel?: boolean
  type?: string
  rows?: number
  placeholder?: string
  maxLength?: number
  required?: boolean
  disabled?: boolean
  readOnly?: boolean
  error?: string
  className?: string
  onClick?: () => void
  onFocus?: (event: InputFocusEvent) => void
  onBlur?: (event: InputFocusEvent) => void
  children?: ReactNode
}

function InputFieldRenderer(
  props: InputFieldProps,
  ref: ReactRef<HTMLInputElement> | ReactRef<HTMLTextAreaElement>,
) {
  const {
    id,
    value,
    onChange: handleChange,
    label,
    hideLabel,
    type,
    rows,
    placeholder,
    maxLength,
    required,
    disabled,
    readOnly,
    error,
    className,
    onClick: handleClick,
    onFocus: handleFocus,
    onBlur: handleBlur,
    children,
  } = props

  const input = (
    <TextInput
      ref={ref}
      as={rows ? "textarea" : "input"}
      id={id}
      type={type}
      value={value}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      style={{ height: rows ? 15 + 21 * rows : undefined }}
      onChange={(event: InputChangeEvent) => handleChange(event.target.value)}
      onClick={handleClick}
      onFocus={handleFocus}
      onBlur={handleBlur}
      aria-label={hideLabel ? label : undefined}
    />
  )

  return (
    <InputContainer className={className}>
      <InputLabel>
        {!hideLabel && <label htmlFor={id}>{label}</label>}
        {required && <InputConstraint state="normal">Required</InputConstraint>}
        {maxLength && (
          <InputConstraint
            state={getLengthConstraintColor(value.length, maxLength)}
          >
            {value.length}/{maxLength}
          </InputConstraint>
        )}
      </InputLabel>
      {Object.prototype.hasOwnProperty.call(props, "children") ? (
        <FlexContainer>
          {input}
          {children}
        </FlexContainer>
      ) : (
        input
      )}
      <InputError error={error} />
    </InputContainer>
  )
}

export const InputField = forwardRef(InputFieldRenderer)
