import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { FlexContainer } from "../../editor/components/Container"
import { InputField } from "../../form/components/InputField"
import { hexToNumber } from "../helpers/hexToNumber"
import { numberToHex } from "../helpers/numberToHex"
import { Color } from "../types/Color"
import { ColorPicker } from "./ColorPicker"

const ColorInputContainer = styled(FlexContainer)`
  position: relative;
  flex-flow: row-reverse;
`

const PopoverContainer = styled.div`
  position: absolute;
  top: 76px;
  z-index: 1;

  width: 100%;
  min-width: 280px;
  max-width: 320px;

  padding: 12px;

  background: ${({ theme }) => theme.background.floating};
  border-radius: 4px;
`

export type ColorInputProps = {
  id: string
  color: Color
  onChange: (color: Color) => void
}

export function ColorInput(props: ColorInputProps) {
  const { id, color, onChange: handleChange } = props

  const [hex, setHex] = useState(() => numberToHex(color))
  useEffect(() => {
    setHex(numberToHex(color))
  }, [color])

  const [isPickerShown, setPickerShown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const lastPickerUseRef = useRef(0)

  useEffect(() => {
    const isHex = /^#[\da-f]{6}$/i.test(hex)
    const number = isHex ? hexToNumber(hex) : undefined

    if (lastPickerUseRef.current + 500 > Date.now()) return
    if (color === null && !isHex) return
    if (hex === "" && color === undefined) return
    if (number === color) return

    if (isHex) {
      handleChange(number)
    } else if (hex === "") {
      handleChange(undefined)
    }
  }, [color, handleChange, hex])

  return (
    <ColorInputContainer
      flow="row"
      onFocus={() => setPickerShown(true)}
      onBlur={() => {
        setTimeout(() => {
          if (!containerRef.current?.contains(document.activeElement)) {
            setPickerShown(false)
          }
        }, 10)
      }}
      ref={containerRef}
    >
      <InputField
        id={id}
        value={hex}
        onChange={color => setHex(color.toLowerCase().trim())}
        label="Color"
        placeholder="#rrggbb"
      />
      {isPickerShown && (
        <PopoverContainer>
          <ColorPicker
            color={color}
            onChange={color => {
              lastPickerUseRef.current = Date.now()
              handleChange(color)
            }}
          />
        </PopoverContainer>
      )}
    </ColorInputContainer>
  )
}
