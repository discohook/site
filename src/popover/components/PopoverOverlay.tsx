import { useObserver } from "mobx-react-lite"
import React from "react"
import { useStores } from "../../state/hooks/useStores"
import { PopoverItem } from "./PopoverItem"

export function PopoverOverlay() {
  const { popoverStore } = useStores()

  return useObserver(() => (
    <div>
      {popoverStore.popovers.map(popover => (
        <PopoverItem key={popover.name} popover={popover} />
      ))}
    </div>
  ))
}
