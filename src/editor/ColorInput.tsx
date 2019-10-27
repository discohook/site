import React, { useEffect, useState } from "react"
import InputField from "./InputField"

export const numberToHex = (number: Color): string =>
  typeof number === "number" ? `#${number.toString(16).padStart(6, "0")}` : ""

export const hexToNumber = (hex: string): Color => parseInt(hex.slice(1), 16)

type Color = number | null | undefined

type Props = {
  id: number
  color: Color
  onChange: (color: Color) => void
}

export default function ColorInput(props: Props) {
  const { id, color, onChange: handleChange } = props

  const [hex, setHex] = useState(numberToHex(color))

  useEffect(() => {
    setHex(numberToHex(color))
  }, [color])

  useEffect(() => {
    const isHex = /^#[0-9a-f]{6}$/i.test(hex)
    const number = isHex ? hexToNumber(hex) : undefined

    if (color === null && !isHex) return
    if (hex.trim() === "" && color === undefined) return
    if (number === color) return

    if (isHex) {
      handleChange(number)
    } else if (hex.trim() === "") {
      handleChange(undefined)
    }
  }, [handleChange, hex, color])

  return (
    <InputField
      id={`message-embed${id}-color`}
      value={hex}
      onChange={color => setHex(color.toLowerCase())}
      label="Color"
      placeholder="#rrggbb"
    />
  )
}
