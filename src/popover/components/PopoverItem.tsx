import { createPopper } from "@popperjs/core"
import React, { useLayoutEffect, useRef } from "react"
import styled from "styled-components"
import { Z_INDEX_POPOVERS } from "../../core/constants"
import { useWindowEvent } from "../../dom/hooks/useWindowEvent"
import { useStores } from "../../state/hooks/useStores"
import { Popover } from "../types/Popover"

export type PopoverItemProps = {
  popover: Popover
}

export const Container = styled.div`
  z-index: ${Z_INDEX_POPOVERS};

  max-width: calc(100vw - 48px);

  padding: 12px;

  background: ${({ theme }) => theme.background.floating};
  border-radius: 4px;
`

export function PopoverItem(props: PopoverItemProps) {
  const { popover } = props
  const { popoverStore } = useStores()

  const ref = useRef<HTMLDivElement>(null)

  useLayoutEffect(() => {
    const { current: element } = ref
    if (!element) return

    const popper = createPopper(popover.anchor, element, {
      placement: popover.placement,
    })

    return () => {
      popper.destroy()
    }
  })

  useWindowEvent("click", event => {
    if (
      !ref.current?.contains(event.target as Node) &&
      !popover.anchor.contains(event.target as Node)
    ) {
      popoverStore.dismiss(popover.name)
    }
  })

  return <Container ref={ref}>{popover.render()}</Container>
}
