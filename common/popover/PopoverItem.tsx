import { createPopper } from "@popperjs/core"
import React, { useLayoutEffect, useRef } from "react"
import { FocusOn } from "react-focus-on"
import { useRequiredContext } from "../state/useRequiredContext"
import type { Popover } from "./Popover"
import { PopoverProvider } from "./PopoverContext"
import { PopoverManagerContext } from "./PopoverManagerContext"

export type PopoverItemProps = {
  popover: Popover
}

export function PopoverItem(props: PopoverItemProps) {
  const { popover } = props

  const manager = useRequiredContext(PopoverManagerContext)

  const ref = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    const { current: element } = ref
    if (!element) return

    const popper = createPopper(popover.anchor, element, {
      placement: popover.placement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 8],
          },
        },
      ],
    })

    return () => {
      popper.destroy()
    }
  })

  return (
    <PopoverProvider value={popover}>
      <FocusOn
        ref={ref}
        shards={popover.shards}
        onClickOutside={() => manager.dismiss(popover.name)}
        onEscapeKey={() => manager.dismiss(popover.name)}
      >
        {popover.render()}
      </FocusOn>
    </PopoverProvider>
  )
}
