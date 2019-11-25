import React, { Key, ReactNode } from "react"
import {
  Action,
  ActionsContainer,
  ActionsHeader,
  BoxContainer,
  Button,
  Container,
} from "./styles"

type Props<T> = {
  items: readonly T[]
  onChange: (items: T[]) => void
  children: (item: T, onChange: (item: T) => void) => ReactNode
  name: string
  limit?: number
  factory: () => T
  keyMapper: (item: T) => Key
}

export default function MultiEditor<T>(props: Props<T>) {
  const {
    items,
    onChange,
    children: render,
    name,
    limit,
    factory,
    keyMapper: getKey,
  } = props

  const addItem = () => onChange([...items, factory()])

  const removeItem = (index: number) =>
    onChange([...items.slice(0, index), ...items.slice(index + 1)])

  const moveItem = (from: number, to: number) => {
    const newItems = [...items]
    newItems.splice(to, 0, ...newItems.splice(from, 1))
    onChange(newItems)
  }

  const modifyItem = (index: number, item: T) =>
    onChange([...items.slice(0, index), item, ...items.slice(index + 1)])

  const editors = items.map((item, index) => (
    <BoxContainer
      key={getKey(item)}
      data-testid={`multieditor--${getKey(item)}`}
    >
      <ActionsContainer>
        <ActionsHeader data-testid={`multieditor-header--${getKey(item)}`}>
          {name} {index + 1}
        </ActionsHeader>
        <Action
          onClick={() => removeItem(index)}
          data-testid={`multieditor-delete--${getKey(item)}`}
        >
          Delete
        </Action>
        {index > 0 && (
          <Action
            onClick={() => moveItem(index, index - 1)}
            data-testid={`multieditor-up--${getKey(item)}`}
          >
            Move Up
          </Action>
        )}
        {items.length - index > 1 && (
          <Action
            onClick={() => moveItem(index, index + 1)}
            data-testid={`multieditor-down--${getKey(item)}`}
          >
            Move Down
          </Action>
        )}
      </ActionsContainer>
      {render(item, newItem => {
        modifyItem(index, newItem)
      })}
    </BoxContainer>
  ))

  return (
    <Container>
      {editors}
      <Button
        disabled={typeof limit === "number" && items.length >= limit}
        onClick={addItem}
        data-testid="multieditor-add"
      >
        Add {name}
      </Button>
    </Container>
  )
}
