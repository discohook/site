import React, { useEffect, useState } from "react"
import InputField from "./InputField"

const numberToHex = (number: number | null | undefined) =>
  typeof number === "number" ? `#${number.toString(16).padStart(6, "0")}` : ""

const hexToNumber = (hex: string) => parseInt(hex.slice(1), 16)

type Props = {
  id: number
  value: number | null | undefined
  onChange: (value: number | null | undefined) => void
}

export default function ColorInput(props: Props) {
  const { id, value, onChange: handleChange } = props

  const [hex, setHex] = useState(numberToHex(value))

  useEffect(() => {
    setHex(numberToHex(value))
  }, [value])

  useEffect(() => {
    const isHex = /^#[0-9a-f]{6}$/i.test(hex)
    const number = hexToNumber(hex) // NaN if isHex is false

    if (value === null && !isHex) return
    if (hex.trim() === "" && value === undefined) return
    if (number === value) return

    if (isHex) {
      handleChange(number)
    } else if (hex.trim() === "") {
      handleChange(undefined)
    }
  }, [handleChange, hex, value])

  return (
    <InputField
      id={`message-embed${id}-color`}
      value={hex}
      onChange={setHex}
      label="Color"
    />
  )
}
