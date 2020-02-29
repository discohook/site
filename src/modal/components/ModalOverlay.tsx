import { useObserver } from "mobx-react-lite"
import React, { Fragment } from "react"
import { Transition, TransitionGroup } from "react-transition-group"
import styled from "styled-components"
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

  pointer-events: none;
`

export function ModalOverlay() {
  const { modalStore } = useStores()

  return useObserver(() => (
    <Container>
      <TransitionGroup component={Fragment}>
        {modalStore.modals.map(modal => (
          <Transition key={modal.name} timeout={MODAL_ANIMATION_DURATION}>
            {state => <ModalItem modal={modal} state={state} />}
          </Transition>
        ))}
      </TransitionGroup>
    </Container>
  ))
}
