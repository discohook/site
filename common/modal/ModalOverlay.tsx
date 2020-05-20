import { easeQuadInOut } from "d3-ease"
import { useObserver } from "mobx-react-lite"
import { useRouter } from "next/router"
import { cover, rgb } from "polished"
import React from "react"
import { FocusOn } from "react-focus-on"
import { animated, useTransition } from "react-spring"
import styled, { css, useTheme } from "styled-components"
import { Z_INDEX_MODALS } from "../constants"
import { useRequiredContext } from "../state/useRequiredContext"
import { ModalProvider } from "./ModalContext"
import { ModalManagerContext } from "./ModalManagerContext"

const Container = styled.div<{ side?: "left" | "right" }>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 100%;

  ${({ side }) =>
    side &&
    css`
      width: 50%;
    `}

  ${({ side }) =>
    side === "right" &&
    css`
      left: 50%;
    `}

  pointer-events: none;
`

const Item = styled.div`
  ${cover()};

  z-index: ${Z_INDEX_MODALS};

  & > .focus-on {
    width: 100%;
    height: 100%;

    display: flex;
    justify-content: center;
    align-items: center;
  }
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

  const modals = useObserver(() => manager.modals.slice())

  const transitions = useTransition(modals, modal => modal.id, {
    config: {
      duration: 150,
      easing: easeQuadInOut,
    },
    contentOpacity: 0,
    contentTransform: "scale(0.9)",
    filterOpacity: 0,
    from: {
      contentOpacity: 0,
      contentTransform: "scale(0.9)",
      filterOpacity: 0,
    },
    enter: {
      contentOpacity: 1,
      contentTransform: "scale(1)",
      filterOpacity: 0.85,
    },
    leave: {
      contentOpacity: 0,
      contentTransform: "scale(0.9)",
      filterOpacity: 0,
    },
  })

  const router = useRouter()
  const { appearance } = useTheme()

  let side: undefined | "left" | "right" = "left"
  if (appearance.mobile && router.route === "/") side = undefined

  return (
    <Container side={side}>
      {transitions.map(transition => (
        <ModalProvider key={transition.key} value={transition.item}>
          <Item>
            <Filter style={{ opacity: transition.props.filterOpacity }} />
            <FocusOn
              className="focus-on"
              onClickOutside={() => transition.item.dismiss()}
              onEscapeKey={() => transition.item.dismiss()}
            >
              <Content
                role="dialog"
                style={{
                  opacity: transition.props.contentOpacity,
                  transform: transition.props.contentTransform,
                }}
              >
                {transition.item.render()}
              </Content>
            </FocusOn>
          </Item>
        </ModalProvider>
      ))}
    </Container>
  )
}
