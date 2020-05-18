import { createPopper } from "@popperjs/core"
import React, { useLayoutEffect, useRef } from "react"
import { useWindowEvent } from "../dom/useWindowEvent"
import { useRequiredContext } from "../state/useRequiredContext"
import type { Popover } from "./Popover"
import { PopoverContainer } from "./PopoverContainer"
import { PopoverManagerContext } from "./PopoverManagerContext"

export type PopoverItemProps = {
  popover: Popover
}

export function PopoverItem(props: PopoverItemProps) {
  const { popover } = props
  const manager = useRequiredContext(PopoverManagerContext)

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
      manager.dismiss(popover.name)
    }
  })

  return <PopoverContainer ref={ref}>{popover.render()}</PopoverContainer>
}
