import { cover, rgb } from "polished"
import React from "react"
import { TransitionStatus } from "react-transition-group/Transition"
import styled, { css } from "styled-components"
import { Z_INDEX_MODALS } from "../../core/constants"
import { useWindowEvent } from "../../dom/hooks/useWindowEvent"
import { useStores } from "../../state/hooks/useStores"
import { MODAL_ANIMATION_DURATION } from "../constants"
import { Modal } from "../types/Modal"

const Container = styled.div`
  ${cover()};

  z-index: ${Z_INDEX_MODALS};
`

const Filter = styled.div<{ state: TransitionStatus }>`
  ${cover()};

  background: ${rgb(0, 0, 0)};
  opacity: 0;

  pointer-events: all;

  transition: ${MODAL_ANIMATION_DURATION}ms ease;

  ${({ state }) =>
    ["entering", "entered"].includes(state) &&
    css`
      opacity: 0.85;
    `}
`

const Content = styled.div<{ state: TransitionStatus }>`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0;
  transform: scale(0.75);

  transition: ${MODAL_ANIMATION_DURATION}ms ease;

  pointer-events: none;

  & > * {
    pointer-events: all;
  }

  ${({ state }) =>
    ["entering", "entered"].includes(state) &&
    css`
      opacity: 1;
      transform: scale(1);
    `}
`

export type ModalItemProps = {
  modal: Modal
  state: TransitionStatus
}

export function ModalItem(props: ModalItemProps) {
  const { modal, state } = props

  const { modalStore } = useStores()

  useWindowEvent("keydown", event => {
    if (event.key === "Escape") {
      modalStore.dismissLast()
    }
  })

  return (
    <Container>
      <Filter onClick={() => modalStore.dismiss(modal.name)} state={state} />
      <Content state={state}>{modal.render()}</Content>
    </Container>
  )
}
