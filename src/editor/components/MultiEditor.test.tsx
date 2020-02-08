import {
  getByText as getByTextFrom,
  queryByText as queryByTextFrom,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React, { cloneElement } from "react"
import { render } from "../../testing/helpers/render"
import { MultiEditor } from "./MultiEditor"

describe("MultiEditor", () => {
  it("renders an item for each item in the list", () => {
    const { getAllByTestId } = render(
      <MultiEditor<number>
        items={[1, 2, 3]}
        onChange={() => {}}
        name="Number"
        factory={() => 0}
        keyMapper={number => number}
      >
        {item => <div data-testid="item">{item}</div>}
      </MultiEditor>,
    )

    const items = getAllByTestId("item")

    expect(items).toHaveLength(3)

    for (const [index, element] of items.entries()) {
      expect(element).toHaveTextContent(String(index + 1))
    }
  })

  it("shows name in editors", () => {
    const { queryByText } = render(
      <MultiEditor<number>
        items={[1, 2, 3]}
        onChange={() => {}}
        name="Number"
        factory={() => 0}
        keyMapper={number => number}
      >
        {item => item}
      </MultiEditor>,
    )

    expect(queryByText("Number 1")).toBeInTheDocument()
    expect(queryByText("Number 2")).toBeInTheDocument()
    expect(queryByText("Number 3")).toBeInTheDocument()
  })

  it("shows move up or down buttons when applicable", () => {
    const { getByTestId } = render(
      <MultiEditor<number>
        items={[1, 2, 3]}
        onChange={() => {}}
        name="Number"
        factory={() => 0}
        keyMapper={number => number}
      >
        {item => item}
      </MultiEditor>,
    )

    const one = getByTestId("multieditor-1")
    expect(queryByTextFrom(one, "Move Up")).not.toBeInTheDocument()
    expect(queryByTextFrom(one, "Move Down")).toBeInTheDocument()

    const two = getByTestId("multieditor-2")
    expect(queryByTextFrom(two, "Move Up")).toBeInTheDocument()
    expect(queryByTextFrom(two, "Move Down")).toBeInTheDocument()

    const three = getByTestId("multieditor-3")
    expect(queryByTextFrom(three, "Move Up")).toBeInTheDocument()
    expect(queryByTextFrom(three, "Move Down")).not.toBeInTheDocument()
  })

  it("handles moving items", () => {
    const handleChange = jest.fn()

    const { getByTestId } = render(
      <MultiEditor<number>
        items={[1, 2, 3]}
        onChange={handleChange}
        name="Number"
        factory={() => 0}
        keyMapper={number => number}
      >
        {item => item}
      </MultiEditor>,
    )

    const second = getByTestId("multieditor-2")
    const moveSecondUp = getByTextFrom(second, "Move Up")
    const moveSecondDown = getByTextFrom(second, "Move Down")

    userEvent.click(moveSecondUp)
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith([2, 1, 3])

    userEvent.click(moveSecondDown)
    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(handleChange).toHaveBeenCalledWith([1, 3, 2])
  })

  it("handles removing items", () => {
    const handleChange = jest.fn()

    const { getByTestId } = render(
      <MultiEditor<number>
        items={[1, 2, 3]}
        onChange={handleChange}
        name="Number"
        factory={() => 0}
        keyMapper={number => number}
      >
        {item => item}
      </MultiEditor>,
    )

    const deleteSecond = getByTextFrom(getByTestId("multieditor-2"), "Delete")

    userEvent.click(deleteSecond)
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith([1, 3])
  })

  it("handles changes from children", async () => {
    const handleChange = jest.fn()

    const { getByTestId } = render(
      <MultiEditor<number>
        items={[1, 2, 3]}
        onChange={handleChange}
        name="Number"
        factory={() => 0}
        keyMapper={number => number}
      >
        {(item, handleChange) => (
          <input
            data-testid={`item-${item}`}
            type="number"
            value={item}
            onChange={event => handleChange(Number(event.target.value))}
          />
        )}
      </MultiEditor>,
    )

    const firstInput = getByTestId("item-1")
    await userEvent.type(firstInput, "0")

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith([0, 2, 3])

    const secondInput = getByTestId("item-2")
    await userEvent.type(secondInput, "5")

    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(handleChange).toHaveBeenCalledWith([1, 5, 3])
  })

  it("can create new items", () => {
    const handleChange = jest.fn()
    const factory = jest.fn(() => 0)

    const { getByTestId } = render(
      <MultiEditor<number>
        items={[1, 2, 3]}
        onChange={handleChange}
        name="Number"
        factory={factory}
        keyMapper={number => number}
      >
        {item => item}
      </MultiEditor>,
    )

    const addButton = getByTestId("multieditor-add")

    userEvent.click(addButton)

    expect(factory).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith([1, 2, 3, 0])
  })

  it("prevents disables add when limit is reached", () => {
    const editor = (
      <MultiEditor<number>
        items={[1, 2, 3, 4]}
        onChange={() => {}}
        name="Number"
        limit={5}
        factory={() => 0}
        keyMapper={number => number}
      >
        {item => item}
      </MultiEditor>
    )

    const { rerender, getByTestId } = render(editor)

    const addButton = getByTestId("multieditor-add")

    expect(addButton).toBeEnabled()

    rerender(cloneElement(editor, { items: [1, 2, 3, 4, 5] }))

    expect(addButton).toBeDisabled()
  })
})
