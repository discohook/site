import { useObserver } from "mobx-react-lite"
import React, { Fragment } from "react"
import { CSSTransition, TransitionGroup } from "react-transition-group"
import styled, { css } from "styled-components"
import { useWindowEvent } from "../../dom/hooks/useWindowEvent"
import { useStores } from "../../state/hooks/useStores"
import { MODAL_ANIMATION_DURATION } from "../constants"
import { ModalItem } from "./ModalItem"

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

export function ModalOverlay() {
  const { modalStore } = useStores()

  useWindowEvent("keydown", event => {
    if (event.key === "Escape") {
      modalStore.dismissLast()
    }
  })

  return useObserver(() => (
    <Container>
      <TransitionGroup component={Fragment}>
        {modalStore.modals.map(modal => (
          <CSSTransition key={modal.name} timeout={MODAL_ANIMATION_DURATION}>
            <ModalItem modal={modal} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </Container>
  ))
}
