import { css } from "@emotion/core"
import styled from "@emotion/styled"
import React from "react"
import { Theme } from "../appearance/Theme"

const Container = styled.div`
  display: flex;
  align-items: center;

  padding: 0 8px;
  height: 32px;

  user-select: none;
`

const ToggleLabel = styled.label<{}, Theme>`
  flex: 1;

  color: ${({ theme }) => theme.header.primary};
  font-size: 16px;
  font-weight: 500;
  line-height: 24px;

  cursor: pointer;
`

const ToggleContainer = styled.div<{ checked?: boolean }, Theme>`
  position: relative;

  width: 42px;
  height: 24px;
  border-radius: 14px;

  background: ${({ theme, checked }) =>
    checked ? theme.accent.primary : "#72767d"};

  transition: 150ms ease-in-out;

  cursor: pointer;

  &::after {
    position: absolute;
    content: "";
    margin: 3px;

    width: 18px;
    height: 18px;
    border-radius: 9px;

    background-color: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
    transition: 150ms ease-in-out;

    pointer-events: none;

    ${({ checked }) =>
      checked &&
      css`
        transform: translateX(18px);
      `}
  }
`

const ToggleInput = styled.input`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  opacity: 0;

  cursor: pointer;
`
ToggleInput.defaultProps = { type: "checkbox" }

type Props = {
  id: string
  label: string
  value: boolean
  onChange: (value: boolean) => void
}

export default function Toggle(props: Props) {
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
