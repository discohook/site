import React, { cloneElement } from "react"
import { fireEvent, render } from "../core/testUtils"
import InputField from "./InputField"

describe("InputField", () => {
  it("listens for changes", () => {
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

    fireEvent.change(input, { target: { value: "Hello!" } })

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

    const { rerender, getByTestId } = render(cloneElement(element))

    const lengthWarning = getByTestId("input-length")

    expect(lengthWarning).toHaveTextContent("3 / 10")
    expect(lengthWarning).toHaveAttribute("data-teststate", "normal")

    rerender(cloneElement(element, { value: "Hey there!" }))

    expect(lengthWarning).toHaveTextContent("10 / 10")
    expect(lengthWarning).toHaveAttribute("data-teststate", "warning")

    rerender(cloneElement(element, { value: "Hey there!!!" }))

    expect(lengthWarning).toHaveTextContent("12 / 10")
    expect(lengthWarning).toHaveAttribute("data-teststate", "error")
  })
})
