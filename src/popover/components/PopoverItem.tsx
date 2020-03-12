import { createPopper } from "@popperjs/core"
import React, { useLayoutEffect, useRef } from "react"
import { useWindowEvent } from "../../dom/hooks/useWindowEvent"
import { useStores } from "../../state/hooks/useStores"
import { Popover } from "../types/Popover"
import { PopoverContainer } from "./PopoverContainer"

export type PopoverItemProps = {
  popover: Popover
}

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

  return <PopoverContainer ref={ref}>{popover.render()}</PopoverContainer>
}
