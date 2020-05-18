import { fireEvent } from "@testing-library/react"
import React, { cloneElement } from "react"
import { render } from "../../testing/render"
import { Toggle } from "./Toggle"

describe("Toggle", () => {
  it("renders an html checkbox input element", () => {
    const { getByLabelText } = render(
      <Toggle id="toggle" label="Toggle" value={false} onChange={() => {}} />,
    )

    const toggle = getByLabelText("Toggle")
    expect(toggle).toBeInstanceOf(HTMLInputElement)
    expect((toggle as HTMLInputElement).type).toEqual("checkbox")
  })

  it("fires a change handler when toggled", () => {
    const handleChange = jest.fn()

    const element = (
      <Toggle
        id="toggle"
        label="Toggle"
        value={false}
        onChange={handleChange}
      />
    )

    const { rerender, getByLabelText } = render(element)

    const toggle = getByLabelText("Toggle")

    fireEvent.click(toggle)
    expect(handleChange).toBeCalledTimes(1)
    expect(handleChange).toBeCalledWith(true)

    rerender(cloneElement(element, { value: true }))

    fireEvent.click(toggle)
    expect(handleChange).toBeCalledTimes(2)
    expect(handleChange).toBeCalledWith(false)
  })
})
