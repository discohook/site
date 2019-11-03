import React, { cloneElement } from "react"
import { render, userEvent } from "../core/testUtils"
import ColorInput, { hexToNumber, numberToHex } from "./ColorInput"

describe("ColorInput", () => {
  it("shows hex value", () => {
    const { getByLabelText } = render(
      <ColorInput id="color-input" color={0xff00ff} onChange={() => {}} />,
    )

    const input = getByLabelText("Color")

    expect(input).toHaveValue("#ff00ff")
  })

  it("handles input changes", async () => {
    const handleChange = jest.fn()

    const { getByLabelText } = render(
      <ColorInput id="color-input" color={undefined} onChange={handleChange} />,
    )

    const input = getByLabelText("Color")

    await userEvent.type(input, "#ff000")
    expect(handleChange).toHaveBeenCalledTimes(0)

    await userEvent.type(input, "#ff0000")
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(0xff0000)
  })

  it("handles emptying input", async () => {
    const handleChange = jest.fn()

    const { getByLabelText } = render(
      <ColorInput id="color-input" color={0xff0000} onChange={handleChange} />,
    )

    const input = getByLabelText("Color")

    await userEvent.type(input, "#")
    expect(handleChange).toHaveBeenCalledTimes(0)

    await userEvent.type(input, "", { allAtOnce: true })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(undefined)
  })

  it("handles changes from parent component", () => {
    const element = (
      <ColorInput id="color-input" color={0xff0000} onChange={() => {}} />
    )

    const { rerender, getByLabelText } = render(element)

    const input = getByLabelText("Color")

    rerender(cloneElement(element, { color: 0x00ff00 }))

    expect(input).toHaveValue("#00ff00")
  })
})

const colors = [
  { number: 0x000000, hex: "#000000" },
  { number: 0x000001, hex: "#000001" },
  { number: 0xffffff, hex: "#ffffff" },
  { number: 0xfffffe, hex: "#fffffe" },
  { number: 0x7289da, hex: "#7289da" },
  { number: 0x43b581, hex: "#43b581" },
  { number: 0xfaa61a, hex: "#faa61a" },
  { number: 0xf04747, hex: "#f04747" },
] as const

describe("hexToNumber", () => {
  it("converts hex to numbers", () => {
    for (const { number, hex } of colors) {
      expect(hexToNumber(hex)).toEqual(number)
    }
  })
})

describe("numberToHex", () => {
  it("converts numbers to hex", () => {
    for (const { number, hex } of colors) {
      expect(numberToHex(number)).toEqual(hex)
    }
  })
})
