import React, { cloneElement } from "react"
import { render, userEvent } from "../core/testUtils"
import ColorInput from "./ColorInput"

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

    await userEvent.type(input, "#ff0000", { allAtOnce: true })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(0xff0000)
  })

  it("handles emptying input", async () => {
    const handleChange = jest.fn()

    const { getByLabelText } = render(
      <ColorInput id="color-input" color={0xff0000} onChange={handleChange} />,
    )

    const input = getByLabelText("Color")

    await userEvent.type(input, "#", { allAtOnce: true })

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
