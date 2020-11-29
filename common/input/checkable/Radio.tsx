import { cover, size } from "polished"
import React from "react"
import styled from "styled-components"
import { useRequiredContext } from "../../state/useRequiredContext"
import { CheckableButton } from "./layout/CheckableButton"
import { CheckableContainer } from "./layout/CheckableContainer"
import { CheckableInput } from "./layout/CheckableInput"
import { CheckableLabel } from "./layout/CheckableLabel"
import { Positioner } from "./layout/Positioner"
import { RadioContext } from "./RadioContext"

const Button = styled(CheckableButton)`
  border-radius: 50%;

  &::after {
    ${cover(2)};
    ${size(8)};

    content: "";
    display: block;

    background: currentColor;
    border-radius: 50%;

    opacity: 0;

    transition: 150ms;
    transition-property: opacity;
  }

  input:checked + &::after {
    opacity: 1;
  }
`

export type RadioProps = {
  id?: string
  label: string
  value: string
  disabled?: boolean
}

export function Radio(props: RadioProps) {
  const { id: givenId, label, value, disabled } = props

  const group = useRequiredContext(RadioContext)

  const id = givenId ?? `${group.id}_${value}`

  return (
    <CheckableContainer>
      <Positioner>
        <CheckableInput
          id={id}
          type="radio"
          tabIndex={group.selected === value ? 0 : -1}
          name={group.id}
          value={value}
          disabled={disabled}
          checked={group.selected === value}
          onChange={group.handleChange}
        />
        <Button />
      </Positioner>
      <CheckableLabel htmlFor={id}>{label}</CheckableLabel>
    </CheckableContainer>
  )
}
