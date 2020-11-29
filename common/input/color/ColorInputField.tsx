import { useObserver } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import styled, { useTheme } from "styled-components"
import { PopoverContainer } from "../../popover/PopoverContainer"
import { usePopover } from "../../popover/usePopover"
import { useAutorun } from "../../state/useAutorun"
import { Input } from "../layout/Input"
import { InputField } from "../text/InputField"
import type { ColorLike } from "./ColorModel"
import { ColorPicker } from "./ColorPicker"

const RGB_STRING_RE = /^([01]?\d{1,2}|2[0-4]\d|25[0-5])[\s,]\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])[\s,]\s*([01]?\d{1,2}|2[0-4]\d|25[0-5])$/

const MonoInputField = styled(InputField)`
  & ${Input} {
    font-size: 15px;
    font-family: ${({ theme }) => theme.font.mono};
  }
`

const Preview = styled.div`
  min-width: 36px;
  max-width: 36px;
  min-height: 36px;
  max-height: 36px;

  border-radius: 4px;

  box-shadow: inset ${({ theme }) => theme.elavation.stroke};

  margin-left: 8px;
`

export type ColorInputProps = {
  id: string
  color: ColorLike
  label: string
}

export function ColorInputField(props: ColorInputProps) {
  const { id, color, label } = props

  const [value, setValue] = useState(() => color.hex ?? "")
  const [touched, setTouched] = useState(false)

  useAutorun(() => {
    if (!touched) setValue(color.hex ?? "")
  })

  const inputRef = useRef<HTMLInputElement>(null)

  const popover = usePopover({
    ref: inputRef,
    render: () => (
      <PopoverContainer>
        <ColorPicker color={color} />
      </PopoverContainer>
    ),
    placement: "bottom-start",
    shards: [inputRef],
  })

  const theme = useTheme()

  return useObserver(() => (
    <MonoInputField
      ref={inputRef}
      id={id}
      value={value}
      onChange={value => {
        setTouched(true)
        setValue(value.toLowerCase())

        if (/^#?[\da-f]{6}$/i.test(value)) {
          color.setHex(value)
        } else if (!value) {
          color.invalidate()
        } else {
          const match = RGB_STRING_RE.exec(value)
          if (match) {
            const [, red, green, blue] = [...match].map(Number)
            color.setRaw(red * 0x010000 + green * 0x000100 + blue)
          }
        }
      }}
      onBlur={() => {
        setTouched(false)
        setValue(color.hex ?? "")
      }}
      label={label}
      placeholder="#rrggbb"
      onClick={() => {
        popover.spawn()
      }}
    >
      <Preview
        role="presentation"
        style={{ backgroundColor: color.hex ?? theme.background.tertiary }}
        onClick={() => {
          popover.spawn()
        }}
      />
    </MonoInputField>
  ))
}
