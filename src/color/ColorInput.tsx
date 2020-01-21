import React, { useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { Container } from "../editor/styles"
import InputField from "../form/InputField"
import { Color } from "./Color"
import ColorPicker from "./ColorPicker"
import { hexToNumber, numberToHex } from "./math"

const ColorInputContainer = styled(Container)`
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

type Props = {
  id: string
  color: Color
  onChange: (color: Color) => void
}

export default function ColorInput(props: Props) {
  const { id, color, onChange: handleChange } = props

  const [hex, setHex] = useState(() => numberToHex(color))
  useEffect(() => {
    setHex(numberToHex(color))
  }, [color])

  const [isPickerShown, setPickerShown] = useState(false)
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
      onBlur={() => setPickerShown(false)}
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
