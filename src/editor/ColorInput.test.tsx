import React, { cloneElement } from "react"
import { render, userEvent } from "../core/testUtils"
import ColorInput, { hexToNumber, numberToHex } from "./ColorInput"

describe("ColorInput", () => {
  it.each<[string, number]>([
    ["#000000", 0x000000],
    ["#000001", 0x000001],
    ["#ffffff", 0xffffff],
    ["#fffffe", 0xfffffe],
    ["#7289da", 0x7289da],
    ["#43b581", 0x43b581],
    ["#faa61a", 0xfaa61a],
    ["#f04747", 0xf04747],
  ])("converts between hex and numbers (%p <-> %p)", (hex, number) => {
    expect(hexToNumber(hex)).toEqual(number)
    expect(numberToHex(number)).toEqual(hex)
  })

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
