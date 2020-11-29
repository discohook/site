import { animated, useTransition } from "@react-spring/web"
import { useObserver } from "mobx-react-lite"
import { cover, rgb } from "polished"
import React from "react"
import { FocusOn } from "react-focus-on"
import styled from "styled-components"
import { Z_INDEX_MODALS } from "../layout/constants"
import { useRequiredContext } from "../state/useRequiredContext"
import { ModalProvider } from "./ModalContext"
import { ModalManagerContext } from "./ModalManagerContext"

const Container = styled.div`
  position: fixed;
  z-index: ${Z_INDEX_MODALS};

  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  width: 100%;

  pointer-events: none;
`

const Item = styled.div`
  ${cover()};
`

const Focus = styled(FocusOn)`
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
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

  const transition = useTransition(modals, {
    key: modal => modal.id,
    config: { friction: 15, tension: 300, clamp: true },
    from: {
      contentOpacity: (0 as unknown) as undefined,
      contentScale: 0.9,
      filterOpacity: (0 as unknown) as undefined,
    },
    enter: {
      contentOpacity: (1 as unknown) as undefined,
      contentScale: 1,
      filterOpacity: (0.85 as unknown) as undefined,
    },
    leave: {
      contentOpacity: (0 as unknown) as undefined,
      contentScale: 0.9,
      filterOpacity: (0 as unknown) as undefined,
    },
  })

  return (
    <Container>
      {transition((style, item) => (
        <ModalProvider value={item}>
          <Item>
            <Filter style={{ opacity: style.filterOpacity }} />
            <Focus
              onClickOutside={() => item.dismiss()}
              onEscapeKey={() => item.dismiss()}
            >
              <Content
                role="dialog"
                style={{
                  opacity: style.contentOpacity,
                  scale: style.contentScale,
                }}
              >
                {item.render()}
              </Content>
            </Focus>
          </Item>
        </ModalProvider>
      ))}
    </Container>
  )
}
