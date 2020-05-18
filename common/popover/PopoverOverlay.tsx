import { useObserver } from "mobx-react-lite"
import React from "react"
import { useRequiredContext } from "../state/useRequiredContext"
import { PopoverItem } from "./PopoverItem"
import { PopoverManagerContext } from "./PopoverManagerContext"

export function PopoverOverlay() {
  const manager = useRequiredContext(PopoverManagerContext)

  return useObserver(() => (
    <div>
      {manager.popovers.map(popover => (
        <PopoverItem key={popover.name} popover={popover} />
      ))}
    </div>
  ))
}
