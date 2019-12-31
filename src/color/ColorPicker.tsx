import styled from "@emotion/styled"
import React, { useLayoutEffect, useRef } from "react"
import { Theme } from "../appearance/Theme"
import { Color, HsvColor } from "./Color"
import { hsvToNumber, numberToHex, numberToHsv } from "./math"
import { useDragArea } from "./useDragArea"

const Container = styled.div<{}, Theme>`
  display: flex;

  padding: 12px;

  background: ${({ theme }) => theme.background.floating};
  border-radius: 4px;
`

const Picker = styled.div`
  flex: 1;
  height: 150px;

  border-radius: 4px;
`

const PickerLayer = styled.div`
  width: 100%;
  height: 100%;

  border-radius: 4px;
`

const PickerKnob = styled.div`
  width: 11px;
  height: 11px;

  border-radius: 50%;

  background: white;
  border: 2px solid white;
`

const HueSlider = styled.div`
  margin-left: 12px;

  width: 12px;
  height: 150px;

  border-radius: 4px;

  background: linear-gradient(
    to bottom,
    #ff0000,
    #ffff00,
    #00ff00,
    #00ffff,
    #0000ff,
    #ff00ff,
    #ff0000
  );
`

const SliderKnob = styled.div`
  width: 16px;
  height: 8px;

  border-radius: 3px;

  background: white;
`

type Props = {
  color: Color
  onChange: (color: Color) => void
}

export default function ColorPicker(props: Props) {
  const { color, onChange } = props

  console.log("ColorPicker render")

  const hsvRef = useRef<HsvColor>({
    hue: 0,
    saturation: Infinity,
    value: Infinity,
  })

  const pickerRef = useRef<HTMLDivElement>(null)
  const pickerKnobRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const sliderKnobRef = useRef<HTMLDivElement>(null)

  const setPickerStyles = () => {
    const { current: picker } = pickerRef
    const { current: pickerKnob } = pickerKnobRef
    const { current: slider } = sliderRef
    const { current: sliderKnob } = sliderKnobRef

    if (!picker || !pickerKnob || !slider || !sliderKnob) return

    const { hue, saturation, value } = hsvRef.current
    const pureColor = hsvToNumber({ hue, saturation: 1, value: 1 })

    const {
      width: pickerWidth,
      height: pickerHeight,
    } = picker.getBoundingClientRect()
    const { height: sliderHeight } = slider.getBoundingClientRect()

    picker.style.backgroundColor = numberToHex(pureColor)

    pickerKnob.style.transform = [
      `translateX(${saturation * pickerWidth - 6}px)`,
      `translateY(${(1 - value) * pickerHeight - 6}px)`,
    ].join(" ")
    pickerKnob.style.backgroundColor = numberToHex(
      hsvToNumber({ hue, saturation, value }),
    )

    const normalHue = hue / 360
    sliderKnob.style.transform = [
      "translateX(-2px)",
      `translateY(${normalHue * sliderHeight - 4}px)`,
    ].join(" ")
  }

  useLayoutEffect(setPickerStyles, [])
  if (hsvToNumber(hsvRef.current) !== color) {
    hsvRef.current = numberToHsv(color)
    setPickerStyles()
  }

  const handleChange = () => {
    const color = hsvToNumber(hsvRef.current)
    onChange(color)
  }

  useDragArea(pickerRef, (mouseX, mouseY) => {
    hsvRef.current.saturation = mouseX
    hsvRef.current.value = 1 - mouseY

    setPickerStyles()
    handleChange()
  })

  useDragArea(sliderRef, (_, mouseY) => {
    hsvRef.current.hue = mouseY * 360

    setPickerStyles()
    handleChange()
  })

  return (
    <Container>
      <Picker ref={pickerRef}>
        <PickerLayer
          style={{
            background: "linear-gradient(to right, white, transparent)",
          }}
        >
          <PickerLayer
            style={{
              background: "linear-gradient(to bottom, transparent, black)",
            }}
          >
            <PickerKnob ref={pickerKnobRef} />
          </PickerLayer>
        </PickerLayer>
      </Picker>
      <HueSlider ref={sliderRef}>
        <SliderKnob ref={sliderKnobRef} />
      </HueSlider>
    </Container>
  )
}
