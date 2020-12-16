import { act, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { reaction } from "mobx"
import React from "react"
import { render } from "../../../testing/render"
import { ColorInputField } from "./ColorInputField"
import { ColorModel } from "./ColorModel"

describe("ColorInput", () => {
  it("shows hex value", () => {
    const color = ColorModel.create()
    color.setRaw(0xff00ff)

    const { getByLabelText } = render(
      <ColorInputField id="color-input" color={color} label="Color" />,
    )

    const input = getByLabelText("Color")

    expect(input).toHaveValue("#ff00ff")
  })

  it("handles input changes", () => {
    const color = ColorModel.create()

    const handleChange = jest.fn()
    reaction(
      () => color.raw,
      number => handleChange(number),
    )

    const { getByLabelText } = render(
      <ColorInputField id="color-input" color={color} label="Color" />,
    )

    const input = getByLabelText("Color")

    userEvent.type(input, "#ff000")

    expect(handleChange).toHaveBeenCalledTimes(0)

    userEvent.type(input, "0")

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(0xff0000)
  })

  it("handles emptying input", () => {
    const color = ColorModel.create()
    color.setRaw(0xff0000)

    const handleChange = jest.fn()
    reaction(
      () => color.raw,
      number => handleChange(number),
    )

    const { getByLabelText } = render(
      <ColorInputField id="color-input" color={color} label="Color" />,
    )

    const input = getByLabelText("Color")

    fireEvent.change(input, { target: { value: "#" } })

    expect(handleChange).toHaveBeenCalledTimes(0)

    fireEvent.change(input, { target: { value: "" } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(null)
  })

  it("handles changes from parent component", () => {
    const color = ColorModel.create()
    color.setRaw(0xff00ff)

    const { getByLabelText } = render(
      <ColorInputField id="color-input" color={color} label="Color" />,
    )

    const input = getByLabelText("Color")

    act(() => {
      color.setRaw(0x00ff00)
    })

    expect(input).toHaveValue("#00ff00")
  })
})
