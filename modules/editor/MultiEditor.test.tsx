import {
  fireEvent,
  getByText as getByTextFrom,
  queryByText as queryByTextFrom,
} from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import React, { cloneElement } from "react"
import { render } from "../../testing/render"
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
        {item => <div data-testid={`item-${item}`}>{item}</div>}
      </MultiEditor>,
    )

    const one = getByTestId("item-1").parentElement!
    expect(queryByTextFrom(one, "Move Up")).not.toBeInTheDocument()
    expect(queryByTextFrom(one, "Move Down")).toBeInTheDocument()

    const two = getByTestId("item-2").parentElement!
    expect(queryByTextFrom(two, "Move Up")).toBeInTheDocument()
    expect(queryByTextFrom(two, "Move Down")).toBeInTheDocument()

    const three = getByTestId("item-3").parentElement!
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
        {item => <div data-testid={`item-${item}`}>{item}</div>}
      </MultiEditor>,
    )

    const second = getByTestId("item-2").parentElement!
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
        {item => <div data-testid={`item-${item}`}>{item}</div>}
      </MultiEditor>,
    )

    const deleteSecond = getByTextFrom(
      getByTestId("item-2").parentElement!,
      "Delete",
    )

    userEvent.click(deleteSecond)
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith([1, 3])
  })

  it("handles changes from children", () => {
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
    fireEvent.change(firstInput, { target: { value: "0" } })

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith([0, 2, 3])

    const secondInput = getByTestId("item-2")
    fireEvent.change(secondInput, { target: { value: "5" } })

    expect(handleChange).toHaveBeenCalledTimes(2)
    expect(handleChange).toHaveBeenCalledWith([1, 5, 3])
  })

  it("can create new items", () => {
    const handleChange = jest.fn()
    const factory = jest.fn(() => 0)

    const { getByText } = render(
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

    const addButton = getByText("Add Number")

    userEvent.click(addButton)

    expect(factory).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith([1, 2, 3, 0])
  })

  it("can duplicate items", () => {
    const handleChange = jest.fn()
    const handleClone = jest.fn(() => 4)

    const { getByTestId } = render(
      <MultiEditor<number>
        items={[1, 2, 3]}
        onChange={handleChange}
        name="Number"
        factory={() => 0}
        keyMapper={number => number}
        clone={handleClone}
      >
        {item => <div data-testid={`item-${item}`}>{item}</div>}
      </MultiEditor>,
    )

    const duplicateSecond = getByTextFrom(
      getByTestId("item-2").parentElement!,
      "Duplicate",
    )

    userEvent.click(duplicateSecond)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith([1, 2, 4, 3])

    expect(handleClone).toHaveBeenCalledTimes(1)
    expect(handleClone).toHaveBeenCalledWith(2)
  })

  it("disables add when limit is reached", () => {
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

    const { rerender, getByText } = render(editor)

    const addButton = getByText("Add Number")

    expect(addButton).toBeEnabled()

    rerender(cloneElement(editor, { items: [1, 2, 3, 4, 5] }))

    expect(addButton).toBeDisabled()
  })

  it("disables duplicate when limit is reached", () => {
    const editor = (
      <MultiEditor<number>
        items={[1, 2, 3, 4]}
        onChange={() => {}}
        name="Number"
        limit={5}
        factory={() => 0}
        keyMapper={number => number}
        clone={() => 0}
      >
        {item => item}
      </MultiEditor>
    )

    const { rerender, queryAllByText } = render(editor)

    expect(queryAllByText("Duplicate")).not.toHaveLength(0)

    rerender(cloneElement(editor, { items: [1, 2, 3, 4, 5] }))

    expect(queryAllByText("Duplicate")).toHaveLength(0)
  })
})
