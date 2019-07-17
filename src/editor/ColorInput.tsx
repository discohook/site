import React, { useEffect, useState } from "react"
import InputField from "./InputField"

type Props = {
  id: number
  value: number | null | undefined
  onChange: (value: number | null | undefined) => void
}

const numToHex = (num: number | null | undefined) =>
  typeof num === "number" ? `#${num.toString(16).padStart(6, "0")}` : ""

const hexToNum = (hex: string) => parseInt(hex.substring(1), 16)

export default function ColorInput(props: Props) {
  const { id, value, onChange: handleChange } = props

  const [hex, setHex] = useState(numToHex(value))

  useEffect(() => {
    setHex(numToHex(value))
  }, [value])

  useEffect(() => {
    const isHex = /^#[0-9a-f]{6}$/i.test(hex)
    const num = hexToNum(hex) // NaN if isHex is false

    if (value === null && !isHex) return
    if (hex.trim() === "" && value === undefined) return
    if (num === value) return

    if (isHex) {
      handleChange(num)
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
