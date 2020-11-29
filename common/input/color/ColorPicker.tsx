import { linearGradient, rgb, rgba, size } from "polished"
import React, { useRef } from "react"
import styled from "styled-components"
import { useDragArea } from "../../dom/useDragArea"
import { FlexContainer } from "../../layout/FlexContainer"
import { useAutorun } from "../../state/useAutorun"
import { ColorLike, ColorModel } from "./ColorModel"

const Picker = styled.div`
  width: 220px;
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

  margin-left: 16px;

  width: 12px;
  height: 150px;

  border-radius: 4px;

  && {
    flex: 0 0 auto;
  }
`

const SliderKnob = styled.div`
  width: 16px;
  height: 8px;

  border-radius: 3px;

  background: white;
`

export type ColorPickerProps = {
  color: ColorLike
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

    pickerKnob.style.visibility = "visible"
    sliderKnob.style.visibility = "visible"

    const {
      width: pickerWidth,
      height: pickerHeight,
    } = picker.getBoundingClientRect()
    const { height: sliderHeight } = slider.getBoundingClientRect()

    const pureColor = ColorModel.create({
      hue: color.hue,
      saturation: 1,
      value: 1,
    })
    picker.style.backgroundColor = pureColor.hex ?? "#ff0000"

    const pickerX = (color.saturation || 0) * pickerWidth - 6
    const pickerY = (1 - (color.value || 0)) * pickerHeight - 6
    pickerKnob.style.transform = `translate(${pickerX}px, ${pickerY}px)`
    pickerKnob.style.backgroundColor = color.hex ?? rgb(0, 0, 0)

    const normalHue = (color.hue || 0) / 360
    sliderKnob.style.transform = `translateX(-2px) translateY(${
      normalHue * sliderHeight - 4
    }px)`
  })

  useDragArea(sliderRef, (mouseX, mouseY) => {
    color.setHue(mouseY * 360)
  })

  useDragArea(pickerRef, (mouseX, mouseY) => {
    if (!color.valid) color.setHue(0)

    color.setSaturation(mouseX)
    color.setValue(1 - mouseY)
  })

  return (
    <FlexContainer>
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
            <PickerKnob ref={pickerKnobRef} style={{ visibility: "hidden" }} />
          </PickerLayer>
        </PickerLayer>
      </Picker>
      <HueSlider ref={sliderRef}>
        <SliderKnob ref={sliderKnobRef} style={{ visibility: "hidden" }} />
      </HueSlider>
    </FlexContainer>
  )
}
