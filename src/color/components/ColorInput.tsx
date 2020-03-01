import { useObserver } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import styled from "styled-components"
import { FlexContainer } from "../../editor/components/Container"
import { InputField } from "../../form/components/InputField"
import { usePopover } from "../../popover/hooks/usePopover"
import { useAutorun } from "../../state/hooks/useAutorun"
import { Color } from "../classes/Color"
import { ColorPicker } from "./ColorPicker"

const ColorInputContainer = styled(FlexContainer)`
  position: relative;
  flex-flow: row-reverse;
`

export type ColorInputProps = {
  id: string
  color: Color
}

export function ColorInput(props: ColorInputProps) {
  const { id, color } = props

  const [hex, setHex] = useState(() => color.hex ?? "")
  useAutorun(() => {
    if (!hex || /^#[\da-f]{6}$/i.test(hex)) setHex(color.hex ?? "")
  })

  const containerRef = useRef<HTMLDivElement>(null)

  const popover = usePopover({
    render: () => <ColorPicker color={color} />,
    placement: "bottom-end",
    ref: containerRef,
  })

  return useObserver(() => (
    <ColorInputContainer
      flow="row"
      onClick={() => {
        popover.spawn()
      }}
      ref={containerRef}
    >
      <InputField
        id={id}
        value={hex}
        onChange={hex => {
          setHex(hex.toLowerCase())

          if (/^#[\da-f]{6}$/i.test(hex)) {
            color.hex = hex
          } else if (!hex) {
            color.invalidate()
          }
        }}
        label="Color"
        placeholder="#rrggbb"
      />
    </ColorInputContainer>
  ))
}
