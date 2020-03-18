import { useObserver } from "mobx-react-lite"
import React, { Key, ReactNode } from "react"
import { Button } from "../../form/components/Button"
import { Actions, ActionsProps } from "./Actions"
import { BoxContainer } from "./BoxContainer"
import { FlexContainer } from "./Container"

export type MultiEditorProps<T> = {
  items: T[]
  onChange?: (items: T[]) => void
  children: (item: T, onChange: (item: T) => void) => ReactNode
  name: string
  limit?: number
  factory: () => T
  keyMapper: (item: T) => Key
  duplicate?: (item: T) => T
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
    duplicate,
  } = props

  const addItem = () => {
    if (onChange) {
      onChange([...items, factory()])
    } else {
      items.push(factory())
    }
  }

  const removeItem = (index: number) => {
    if (onChange) {
      onChange([...items.slice(0, index), ...items.slice(index + 1)])
    } else {
      items.splice(index, 1)
    }
  }

  const moveItem = (from: number, to: number) => {
    if (onChange) {
      const newItems = [...items]
      newItems.splice(to, 0, ...newItems.splice(from, 1))
      onChange(newItems)
    } else {
      items.splice(to, 0, ...items.splice(from, 1))
    }
  }

  const duplicateItem = (index: number) => {
    if (!duplicate) return
    if (onChange) {
      const newItems = [...items]
      newItems.splice(index, 0, duplicate(items[index]))
      onChange(newItems)
    } else {
      items.splice(index, 0, duplicate(items[index]))
    }
  }

  const modifyItem = (index: number, item: T) =>
    onChange?.([...items.slice(0, index), item, ...items.slice(index + 1)])

  return useObserver(() => {
    const editors = items.map((item, index) => (
      <BoxContainer
        key={getKey(item)}
        data-testid={`multieditor-${getKey(item)}`}
      >
        <Actions
          title={`${name} ${index + 1}`}
          actions={
            [
              duplicate && {
                name: "Duplicate",
                action: () => duplicateItem(index),
              },
              { name: "Delete", action: () => removeItem(index) },
              index > 0 && {
                name: "Move Up",
                action: () => moveItem(index, index - 1),
              },
              items.length - index > 1 && {
                name: "Move Down",
                action: () => moveItem(index, index + 1),
              },
            ].filter(Boolean) as ActionsProps["actions"]
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
  })
}
