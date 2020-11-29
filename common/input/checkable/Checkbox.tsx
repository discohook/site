import { cover, size } from "polished"
import React from "react"
import styled from "styled-components"
import { check } from "../../../icons/check"
import { CheckableButton } from "./layout/CheckableButton"
import { CheckableContainer } from "./layout/CheckableContainer"
import { CheckableInput } from "./layout/CheckableInput"
import { CheckableLabel } from "./layout/CheckableLabel"
import { Positioner } from "./layout/Positioner"

const Button = styled(CheckableButton)`
  border-radius: 3px;

  & > svg {
    ${cover()};
    ${size("100%")};

    opacity: 0;
    transition: 150ms;
    transition-property: opacity;
  }

  input:checked + & > svg {
    opacity: 1;
  }
`

export type CheckboxProps = {
  id: string
  label: string
  value: boolean
  onChange: (value: boolean) => void
  className?: string
  disabled?: boolean
}

export function Checkbox(props: CheckboxProps) {
  const {
    id,
    label,
    value,
    onChange: handleChange,
    className,
    disabled,
  } = props

  return (
    <CheckableContainer className={className}>
      <Positioner>
        <CheckableInput
          id={id}
          type="checkbox"
          disabled={disabled}
          checked={value}
          onChange={event => handleChange(event.target.checked)}
        />
        <Button>{check}</Button>
      </Positioner>
      <CheckableLabel htmlFor={id}>{label}</CheckableLabel>
    </CheckableContainer>
  )
}
