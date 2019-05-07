import React from "react"
import { InputLabel, TextInput } from "./styles"

interface Props {
  value: number
  onChange: (value: number) => void
}

const numToHex = (num: number) => `#${num.toString(16).padStart(6, "0")}`
const hexToNum = (hex: string) => parseInt(hex.substring(1), 16)

export function ColorInput(props: Props) {
  return (
    <InputLabel>
      Embed color
      <TextInput
        value={numToHex(props.value)}
        onChange={(event) =>
          props.onChange(hexToNum(event.target.value || "#000000"))
        }
      />
    </InputLabel>
  )
}
