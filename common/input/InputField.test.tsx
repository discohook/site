import userEvent from "@testing-library/user-event"
import React, { cloneElement } from "react"
import { render } from "../../testing/render"
import { DARK_THEME } from "../style/themes/darkTheme"
import { InputField } from "./InputField"

describe("InputField", () => {
  it("listens for changes", async () => {
    const handleChange = jest.fn()

    const { getByLabelText } = render(
      <InputField
        id="message"
        label="Message"
        value="Hello"
        onChange={handleChange}
      />,
    )

    const input = getByLabelText("Message")

    await userEvent.type(input, "!")

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith("Hello!")
  })

  it("shows max length", () => {
    const element = (
      <InputField
        id="message"
        label="Message"
        value="Hey"
        onChange={() => {}}
        maxLength={10}
      />
    )

    const { rerender, getByText } = render(cloneElement(element))

    expect(getByText("3 / 10")).toHaveStyle({
      color: DARK_THEME.text.normal,
    })

    rerender(cloneElement(element, { value: "Hey there!" }))

    expect(getByText("10 / 10")).toHaveStyle({
      color: DARK_THEME.accent.warning,
    })

    rerender(cloneElement(element, { value: "Hey there!!!" }))

    expect(getByText("12 / 10")).toHaveStyle({
      color: DARK_THEME.accent.danger,
    })
  })

  it("defaults to text prop type", () => {
    const { getByLabelText } = render(
      <InputField
        id="message"
        label="Message"
        value="Hello"
        onChange={() => {}}
      />,
    )

    const input = getByLabelText("Message")

    expect(input).toHaveAttribute("type", "text")
  })

  it("respects input type prop", () => {
    const { getByLabelText } = render(
      <InputField
        id="number"
        label="Number"
        value="123"
        onChange={() => {}}
        type="number"
      />,
    )

    const input = getByLabelText("Number")

    expect(input).toHaveAttribute("type", "number")
  })

  it("renders a textarea when type is multiline", () => {
    const { getByLabelText } = render(
      <InputField
        id="message"
        label="Message"
        value="Hello"
        onChange={() => {}}
        type="multiline"
      />,
    )

    const input = getByLabelText("Message")

    expect(input).toBeInstanceOf(HTMLTextAreaElement)
  })
})
