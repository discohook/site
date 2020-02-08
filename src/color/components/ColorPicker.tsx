import { linearGradient, rgb, rgba } from "polished"
import React, { useLayoutEffect, useRef } from "react"
import styled from "styled-components"
import { hsvToNumber } from "../helpers/hsvToNumber"
import { numberToHex } from "../helpers/numberToHex"
import { numberToHsv } from "../helpers/numberToHsv"
import { useDragArea } from "../hooks/useDragArea"
import { Color } from "../types/Color"
import { HsvColor } from "../types/HsvColor"

const Container = styled.div`
  display: flex;
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
  ${linearGradient({
    colorStops: [
      rgb(255, 0, 0),
      rgb(255, 255, 0),
      rgb(0, 255, 0),
      rgb(0, 255, 255),
      rgb(0, 0, 255),
      rgb(255, 0, 255),
      rgb(255, 0, 0),
    ],
    toDirection: "to bottom",
  })}

  margin-left: 12px;

  width: 12px;
  height: 150px;

  border-radius: 4px;
`

const SliderKnob = styled.div`
  width: 16px;
  height: 8px;

  border-radius: 3px;

  background: white;
`

export type ColorPickerProps = {
  color: Color
  onChange: (color: Color) => void
}

export function ColorPicker(props: ColorPickerProps) {
  const { color, onChange } = props

  const hsvRef = useRef<HsvColor>({
    hue: 0,
    saturation: NaN,
    value: NaN,
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
            ...linearGradient({
              colorStops: [rgb(255, 255, 255), rgba(255, 255, 255, 0)],
              toDirection: "to right",
            }),
          }}
        >
          <PickerLayer
            style={{
              ...linearGradient({
                colorStops: [rgba(0, 0, 0, 0), rgb(0, 0, 0)],
                toDirection: "to bottom",
              }),
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
