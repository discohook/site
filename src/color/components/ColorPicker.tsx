import { linearGradient, rgb, rgba, size } from "polished"
import React, { useRef } from "react"
import styled from "styled-components"
import { useAutorun } from "../../state/hooks/useAutorun"
import { Color } from "../classes/Color"
import { hsvToNumber } from "../helpers/hsvToNumber"
import { numberToHex } from "../helpers/numberToHex"
import { useDragArea } from "../hooks/useDragArea"

const Container = styled.div`
  display: flex;
`

const Picker = styled.div`
  flex: 1;
  width: 240px;
  height: 150px;

  border-radius: 4px;
`

const PickerLayer = styled.div`
  ${size("100%")};

  border-radius: 4px;
`

const PickerKnob = styled.div`
  ${size(11)};

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
}

export function ColorPicker(props: ColorPickerProps) {
  const { color } = props

  const pickerRef = useRef<HTMLDivElement>(null)
  const pickerKnobRef = useRef<HTMLDivElement>(null)
  const sliderRef = useRef<HTMLDivElement>(null)
  const sliderKnobRef = useRef<HTMLDivElement>(null)

  useAutorun(() => {
    const { current: picker } = pickerRef
    const { current: pickerKnob } = pickerKnobRef
    const { current: slider } = sliderRef
    const { current: sliderKnob } = sliderKnobRef

    if (!picker || !pickerKnob || !slider || !sliderKnob) return

    const {
      width: pickerWidth,
      height: pickerHeight,
    } = picker.getBoundingClientRect()
    const { height: sliderHeight } = slider.getBoundingClientRect()

    const pureColor = hsvToNumber({
      hue: color.hue || 0,
      saturation: 1,
      value: 1,
    })
    picker.style.backgroundColor = numberToHex(pureColor)

    pickerKnob.style.transform = [
      `translateX(${color.saturation * pickerWidth - 6}px)`,
      `translateY(${(1 - color.value) * pickerHeight - 6}px)`,
    ].join(" ")
    pickerKnob.style.backgroundColor = color.hex ?? rgb(0, 0, 0)

    const normalHue = (color.hue || 0) / 360
    sliderKnob.style.transform = [
      "translateX(-2px)",
      `translateY(${normalHue * sliderHeight - 4}px)`,
    ].join(" ")
  })

  useDragArea(pickerRef, (mouseX, mouseY) => {
    if (Number.isNaN(color.hue)) color.hue = 0
    color.saturation = mouseX
    color.value = 1 - mouseY
  })

  useDragArea(sliderRef, (mouseX, mouseY) => {
    color.hue = mouseY * 360
  })

  return (
    <Container>
      <Picker ref={pickerRef}>
        <PickerLayer
          style={{
            ...linearGradient({
              colorStops: [rgb(255, 255, 255), rgba(255, 255, 255, 0)],
              fallback: rgba(0, 0, 0, 0),
              toDirection: "to right",
            }),
          }}
        >
          <PickerLayer
            style={{
              ...linearGradient({
                colorStops: [rgba(0, 0, 0, 0), rgb(0, 0, 0)],
                fallback: rgba(0, 0, 0, 0),
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
