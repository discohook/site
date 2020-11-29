import { animated, useSpring } from "@react-spring/web"
import React, { useContext, useRef } from "react"
import styled from "styled-components"
import { useMeasure } from "../dom/useMeasure"
import { Interactive } from "../input/Interactive"
import { PopoverContext } from "../popover/PopoverContext"
import { PopoverManagerContext } from "../popover/PopoverManagerContext"
import { useIsomorphicLayoutEffect } from "../state/useIsomorphicLayoutEffect"
import type { Action } from "./ActionButtons"

const Container = styled(animated.div)`
  overflow: hidden;

  background: ${({ theme }) => theme.background.primary};
  border: 1px solid ${({ theme }) => theme.background.secondary};
  border-radius: 4px;

  box-shadow: ${({ theme }) => theme.elavation.high};
`

const List = styled.ul`
  padding: 0;
  margin: 0;

  &::before,
  &::after {
    content: "";
    display: block;
    height: 8px;
  }
`

const Item = styled.li`
  list-style: none;
`

const Content = styled(Interactive)`
  width: 100%;

  padding: 8px 15px;
  display: flex;

  font-weight: 500;
`

const Icon = styled.div`
  margin-right: 16px;

  & > svg {
    display: block;
  }
`

export type ActionOverflowMenuProps = {
  actions: Action[]
}

export function ActionOverflowMenu(props: ActionOverflowMenuProps) {
  const { actions } = props

  const [listRef, { height }] = useMeasure()
  const style = useSpring({
    height,
  })

  const manager = useContext(PopoverManagerContext)
  const popover = useContext(PopoverContext)

  const containerRef = useRef<HTMLDivElement>(null)
  useIsomorphicLayoutEffect(() => {
    const { current: container } = containerRef
    if (!container) return

    container.scrollTop = 1
  })

  return (
    <Container ref={containerRef} style={style}>
      <List ref={listRef}>
        {actions.map(action => (
          <Item key={action.label}>
            <Content
              onClick={() => {
                action.handler()

                if (manager && popover) {
                  manager.dismiss(popover.name)
                }
              }}
            >
              <Icon aria-hidden>{action.icon}</Icon>
              {action.label}
            </Content>
          </Item>
        ))}
      </List>
    </Container>
  )
}
