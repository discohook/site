import { easeCubicInOut } from "d3-ease"
import { useObserver } from "mobx-react-lite"
import { cover, rgb } from "polished"
import React from "react"
import { animated, useTransition } from "react-spring"
import styled, { css } from "styled-components"
import { Z_INDEX_MODALS } from "../constants"
import { useWindowEvent } from "../dom/useWindowEvent"
import { useRequiredContext } from "../state/useRequiredContext"
import { ModalProvider } from "./ModalContext"
import { ModalManagerContext } from "./ModalManagerContext"

const Container = styled.div<{ active?: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 50%;

  ${({ theme }) =>
    theme.appearance.mobile &&
    css`
      width: 100%;
    `}

  pointer-events: none;
`

const Item = styled.div`
  ${cover()};

  z-index: ${Z_INDEX_MODALS};
`

const Filter = styled(animated.div)`
  ${cover()};

  background: ${rgb(0, 0, 0)};
  opacity: 0.85;

  pointer-events: all;
`

const Content = styled(animated.div)`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  pointer-events: none;

  & > * {
    pointer-events: all;
  }
`

export function ModalOverlay() {
  const manager = useRequiredContext(ModalManagerContext)

  useWindowEvent("keydown", event => {
    if (event.key === "Escape") {
      if (manager.modals.length === 0) return

      const lastModal = manager.modals[manager.modals.length - 1]
      lastModal.dismiss()
    }
  })

  const modals = useObserver(() => manager.modals.slice())

  const transitions = useTransition(modals, modal => modal.id, {
    config: {
      duration: 200,
      easing: easeCubicInOut,
    },
    contentOpacity: 0,
    contentTransform: "scale(0.75)",
    filterOpacity: 0,
    from: {
      contentOpacity: 0,
      contentTransform: "scale(0.75)",
      filterOpacity: 0,
    },
    enter: {
      contentOpacity: 1,
      contentTransform: "scale(1)",
      filterOpacity: 0.85,
    },
    leave: {
      contentOpacity: 0,
      contentTransform: "scale(0.75)",
      filterOpacity: 0,
    },
  })

  return (
    <Container>
      {transitions.map(transition => (
        <ModalProvider key={transition.key} value={transition.item}>
          <Item>
            <Filter
              style={{
                opacity: transition.props.filterOpacity,
              }}
              onClick={() => transition.item.dismiss()}
            />
            <Content
              style={{
                opacity: transition.props.contentOpacity,
                transform: transition.props.contentTransform,
              }}
            >
              {transition.item.render()}
            </Content>
          </Item>
        </ModalProvider>
      ))}
    </Container>
  )
}
