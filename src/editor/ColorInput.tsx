import React, { useEffect, useState } from "react"
import { InputLabel, TextInput } from "./styles"

interface Props {
  value: number | undefined
  onChange: (value: number | undefined) => void
}

const numToHex = (num: number | undefined) =>
  num ? `#${num.toString(16).padStart(6, "0")}` : ""

const hexToNum = (hex: string) => parseInt(hex.substring(1), 16)

export function ColorInput(props: Props) {
  const [hex, setHex] = useState(numToHex(props.value))

  useEffect(() => {
    setHex(numToHex(props.value))
  }, [props.value])

  useEffect(() => {
    if (/^#[0-9a-f]{6}$/i.exec(hex)) props.onChange(hexToNum(hex))
    if (hex.trim() === "") props.onChange(undefined)
  }, [hex])

  return (
    <InputLabel>
      Embed color
      <TextInput value={hex} onChange={(event) => setHex(event.target.value)} />
    </InputLabel>
  )
}
