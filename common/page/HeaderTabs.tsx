import { Tab, TabList, Tabs } from "@reach/tabs"
import React from "react"
import styled from "styled-components"
import { Clickable } from "../input/Clickable"

const Container = styled(Tabs)`
  height: 48px;
`

const List = styled(TabList)`
  height: 100%;

  display: flex;
  align-items: center;

  background: none;
`

const Item = styled(Clickable).attrs({ as: Tab })`
  height: 100%;
  padding: 0 8px;
  margin: 0 4px;

  display: flex;
  align-items: center;

  color: ${({ theme }) => theme.header.primary};
  font-size: 15px;
  font-weight: 600;
  text-align: center;

  position: relative;

  &:hover,
  &:focus {
    text-decoration: underline;
  }

  &[data-reach-tab][data-selected]::after {
    content: "";
    display: block;

    position: absolute;
    bottom: 0;
    left: 8px;

    width: calc(100% - 16px);
    height: 4px;

    background: ${({ theme }) => theme.accent.primary};
    border-radius: 8px 8px 0 0;
  }

  &[data-reach-tab]:active {
    background: none;
  }

  &[data-reach-tab]:disabled {
    color: ${({ theme }) => theme.header.secondary};
  }
`

export type HeaderTabsProps<T extends string> = {
  items: T[]
  current: T
  onChange: (tab: T) => void
}

export function HeaderTabs<T extends string>(props: HeaderTabsProps<T>) {
  const { items, current, onChange: handleChange } = props

  return (
    <Container
      index={items.indexOf(current)}
      onChange={(index: number) => handleChange(items[index])}
    >
      <List>
        {items.map(item => (
          <Item key={item}>{item}</Item>
        ))}
      </List>
    </Container>
  )
}
