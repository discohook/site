import { cover, rgb } from "polished"
import React from "react"
import styled from "styled-components"
import { Z_INDEX_MODALS } from "../../core/constants"
import { useStores } from "../../state/hooks/useStores"
import { MODAL_ANIMATION_DURATION } from "../constants"
import type { Modal } from "../types/Modal"

const Container = styled.div`
  ${cover()};

  z-index: ${Z_INDEX_MODALS};
`

const Filter = styled.div`
  ${cover()};

  background: ${rgb(0, 0, 0)};
  opacity: 0.85;

  pointer-events: all;

  transition: ${MODAL_ANIMATION_DURATION}ms;

  .enter > &,
  .exit-active > & {
    opacity: 0;
  }
`

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  transition: ${MODAL_ANIMATION_DURATION}ms;

  .enter > &,
  .exit-active > & {
    opacity: 0;
    transform: scale(0.75);
  }

  pointer-events: none;

  & > * {
    pointer-events: all;
  }
`

export type ModalItemProps = {
  modal: Modal
}

export function ModalItem(props: ModalItemProps) {
  const { modal } = props

  const { modalStore } = useStores()

  return (
    <Container>
      <Filter
        onClick={() => {
          modalStore.dismiss(modal.name)
        }}
      />
      <Content>{modal.render()}</Content>
    </Container>
  )
}
