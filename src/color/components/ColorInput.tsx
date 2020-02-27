import { useObserver } from "mobx-react-lite"
import React, { useRef, useState } from "react"
import styled from "styled-components"
import { Z_INDEX_POPOVERS } from "../../core/constants"
import { FlexContainer } from "../../editor/components/Container"
import { InputField } from "../../form/components/InputField"
import { useAutorun } from "../../state/hooks/useAutorun"
import { Color } from "../classes/Color"
import { ColorPicker } from "./ColorPicker"

const ColorInputContainer = styled(FlexContainer)`
  position: relative;
  flex-flow: row-reverse;
`

const PopoverContainer = styled.div`
  position: absolute;
  top: 76px;
  z-index: ${Z_INDEX_POPOVERS};

  width: 100%;
  min-width: 280px;
  max-width: 320px;

  padding: 12px;

  background: ${({ theme }) => theme.background.floating};
  border-radius: 4px;
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

  const [isPickerShown, setPickerShown] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  return useObserver(() => (
    <ColorInputContainer
      flow="row"
      onFocus={() => setPickerShown(true)}
      onBlur={() => {
        setTimeout(() => {
          if (!containerRef.current?.contains(document.activeElement)) {
            setPickerShown(false)
          }
        }, 10)
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
      {isPickerShown && (
        <PopoverContainer>
          <ColorPicker color={color} />
        </PopoverContainer>
      )}
    </ColorInputContainer>
  ))
}
