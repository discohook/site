import React from "react"
import { fireEvent, render } from "../core/testUtils"
import Button from "./Button"

describe("Button", () => {
  it("renders an html button", () => {
    const { getByText } = render(<Button>Button</Button>)

    const button = getByText("Button")
    expect(button).toBeInstanceOf(HTMLButtonElement)
  })

  it("fires a click handler when clicked", () => {
    const handleClick = jest.fn()

    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>,
    )

    const button = getByText("Click me")

    fireEvent.click(button)

    expect(handleClick).toBeCalledTimes(1)
  })
})
