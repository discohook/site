import type { ReactNode } from "react"
import React from "react"
import styled from "styled-components"
import { InputContainer } from "../layout/InputContainer"
import { InputLabel } from "../layout/InputLabel"
import { RadioProvider } from "./RadioContext"

const GroupContainer = styled.div`
  display: flex;

  & > * {
    margin-right: 8px;
  }
`

export type RadioGroupProps<T extends string> = {
  id: string
  label: string
  value: T
  onChange: (value: T) => void
  children?: ReactNode
}

export function RadioGroup<T extends string>(props: RadioGroupProps<T>) {
  const { id, label, value, onChange: handleChange, children } = props

  return (
    <RadioProvider
      value={{
        id,
        selected: value,
        handleChange: event => handleChange(event.target.value as T),
      }}
    >
      <InputContainer role="radiogroup" aria-labelledby={id}>
        <InputLabel>
          <label htmlFor={id}>{label}</label>
        </InputLabel>
        <GroupContainer>{children}</GroupContainer>
      </InputContainer>
    </RadioProvider>
  )
}
