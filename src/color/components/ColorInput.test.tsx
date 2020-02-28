import { act, fireEvent } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { reaction } from "mobx"
import React from "react"
import { render } from "../../testing/helpers/render"
import { Color } from "../classes/Color"
import { ColorInput } from "./ColorInput"

describe("ColorInput", () => {
  it("shows hex value", () => {
    const color = new Color(0xff00ff)

    const { getByLabelText } = render(
      <ColorInput id="color-input" color={color} />,
    )

    const input = getByLabelText("Color")

    expect(input).toHaveValue("#ff00ff")
  })

  it("handles input changes", async () => {
    const color = new Color(null)

    const handleChange = jest.fn()
    reaction(
      () => color.color,
      number => handleChange(number),
    )

    const { getByLabelText } = render(
      <ColorInput id="color-input" color={color} />,
    )

    const input = getByLabelText("Color")

    await userEvent.type(input, "#ff000")

    expect(handleChange).toHaveBeenCalledTimes(0)

    await userEvent.type(input, "0")

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(0xff0000)
  })

  it("handles emptying input", async () => {
    const color = new Color(0xff0000)

    const handleChange = jest.fn()
    reaction(
      () => color.color,
      number => handleChange(number),
    )

    const { getByLabelText } = render(
      <ColorInput id="color-input" color={color} />,
    )

    const input = getByLabelText("Color")

    fireEvent.change(input, { target: { value: "#" } })

    expect(handleChange).toHaveBeenCalledTimes(0)

    fireEvent.change(input, { target: { value: "" } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(null)
  })

  it("handles changes from parent component", () => {
    const color = new Color(0xff00ff)

    const { getByLabelText } = render(
      <ColorInput id="color-input" color={color} />,
    )

    const input = getByLabelText("Color")

    act(() => {
      color.color = 0x00ff00
    })

    expect(input).toHaveValue("#00ff00")
  })
})
