import React, { Key, ReactNode } from "react"
import { Button } from "../../form/components/Button"
import { Actions } from "./Actions"
import { BoxContainer } from "./BoxContainer"
import { FlexContainer } from "./Container"

export type MultiEditorProps<T> = {
  items: readonly T[]
  onChange: (items: T[]) => void
  children: (item: T, onChange: (item: T) => void) => ReactNode
  name: string
  limit?: number
  factory: () => T
  keyMapper: (item: T) => Key
}

export function MultiEditor<T>(props: MultiEditorProps<T>) {
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
      data-testid={`multieditor-${getKey(item)}`}
    >
      <Actions
        title={`${name} ${index + 1}`}
        actions={
          [
            { name: "Delete", action: () => removeItem(index) },
            index > 0 && {
              name: "Move Up",
              action: () => moveItem(index, index - 1),
            },
            items.length - index > 1 && {
              name: "Move Down",
              action: () => moveItem(index, index + 1),
            },
          ].filter(Boolean) as Parameters<typeof Actions>[0]["actions"]
        }
      />
      {render(item, newItem => {
        modifyItem(index, newItem)
      })}
    </BoxContainer>
  ))

  return (
    <FlexContainer>
      {editors}
      <Button
        disabled={typeof limit === "number" && items.length >= limit}
        onClick={addItem}
        data-testid="multieditor-add"
      >
        Add {name}
      </Button>
    </FlexContainer>
  )
}
