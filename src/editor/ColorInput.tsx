import React, { useState } from "react"
import InputField from "./InputField"

interface Props {
  value: number | undefined
  onChange: (value: number | undefined) => void
}

const numToHex = (num: number | undefined) =>
  num ? `#${num.toString(16).padStart(6, "0")}` : ""

const hexToNum = (hex: string) => parseInt(hex.substring(1), 16)

export default function ColorInput(props: Props) {
  const { value, onChange: handleChange } = props
  const [hex, setHex] = useState(numToHex(value))

  return (
    <InputField
      value={hex}
      onChange={(hex) => {
        setHex(numToHex(value))
        handleChange(/^#[0-9a-f]{6}$/i.exec(hex) ? hexToNum(hex) : undefined)
      }}
      label="Embed color"
    />
  )
}
