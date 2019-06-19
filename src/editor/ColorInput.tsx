import React, { useCallback, useEffect, useState } from "react"
import { InputLabel, TextInput } from "./styles"

interface Props {
  value: number | undefined
  onChange: (value: number | undefined) => void
}

const numToHex = (num: number | undefined) =>
  num ? `#${num.toString(16).padStart(6, "0")}` : ""

const hexToNum = (hex: string) => parseInt(hex.substring(1), 16)

export default function ColorInput(props: Props) {
  const { value, onChange } = props
  const [hex, setHex] = useState(numToHex(value))

  useEffect(() => {
    setHex(numToHex(props.value))
  }, [props.value])

  const handleChange = useCallback(onChange, [])
  useEffect(() => {
    handleChange(/^#[0-9a-f]{6}$/i.exec(hex) ? hexToNum(hex) : undefined)
  }, [hex, handleChange])

  return (
    <InputLabel>
      Embed color
      <TextInput value={hex} onChange={(event) => setHex(event.target.value)} />
    </InputLabel>
  )
}
