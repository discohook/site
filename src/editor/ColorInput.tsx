import React, { useCallback, useEffect, useState } from "react"
import InputField from "./InputField"

interface Props {
  value: number | null | undefined
  onChange: (value: number | null | undefined) => void
}

const numToHex = (num: number | null | undefined) =>
  typeof num === "number" ? `#${num.toString(16).padStart(6, "0")}` : ""

const hexToNum = (hex: string) => parseInt(hex.substring(1), 16)

export default function ColorInput(props: Props) {
  const { value, onChange } = props
  const handleChange = useCallback(onChange, [])

  const [hex, setHex] = useState(numToHex(value))

  useEffect(() => {
    setHex(numToHex(value))
  }, [value])

  useEffect(() => {
    if (/^#[0-9a-f]{6}$/i.test(hex)) handleChange(hexToNum(hex))
    else if (hex.trim() === "" && value !== null) handleChange(undefined)
  }, [handleChange, hex, value])

  return <InputField value={hex} onChange={setHex} label="Embed color" />
}
