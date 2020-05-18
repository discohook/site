import { size, transparentize } from "polished"
import React from "react"
import styled, { css } from "styled-components"
import { DARK_THEME } from "../style/themes/darkTheme"

const Container = styled.div`
  display: flex;
  align-items: center;

  padding: 0 8px;
  height: 32px;

  user-select: none;
`

const ToggleLabel = styled.label`
  flex: 1;

  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;

  cursor: pointer;

  ${Container}:focus-within > & {
    text-decoration: underline;
  }
`

const ToggleContainer = styled.div<{ checked?: boolean }>`
  position: relative;

  width: 42px;
  height: 24px;
  border-radius: 14px;

  background: ${({ theme, checked }) =>
    checked ? theme.accent.primary : DARK_THEME.text.muted};

  transition: 150ms ease-in-out;

  cursor: pointer;

  &::after {
    ${size(18)};

    position: absolute;
    content: "";
    margin: 3px;

    border-radius: 9px;

    background-color: ${DARK_THEME.interactive.active};
    box-shadow: 0 2px 4px ${transparentize(0.7, "black")};
    transition: 150ms ease-in-out;

    pointer-events: none;

    ${({ checked }) =>
      checked &&
      css`
        transform: translateX(18px);
      `}
  }
`

const ToggleInput = styled.input.attrs({ type: "checkbox" })`
  ${size("100%")};

  position: absolute;
  padding: 0;
  margin: 0;
  opacity: 0;

  cursor: pointer;
`

export type ToggleProps = {
  id: string
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

export function Toggle(props: ToggleProps) {
  const { id, label, value, onChange: handleChange } = props

  return (
    <Container>
      <ToggleLabel htmlFor={id}>{label}</ToggleLabel>
      <ToggleContainer checked={value}>
        <ToggleInput
          id={id}
          checked={value}
          onChange={event => handleChange(event.target.checked)}
        />
      </ToggleContainer>
    </Container>
  )
}
