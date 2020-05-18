import type { Placement } from "@popperjs/core"
import { ReactNode, RefObject, useCallback, useEffect, useState } from "react"
import { useRequiredContext } from "../state/useRequiredContext"
import { getUniqueId } from "../uid"
import { PopoverManagerContext } from "./PopoverManagerContext"

export type UsePopoverOptions = {
  ref: RefObject<HTMLElement>
  render: () => ReactNode
  placement: Placement
}

export const usePopover = (options: UsePopoverOptions) => {
  const { ref, render, placement } = options

  const manager = useRequiredContext(PopoverManagerContext)

  const [popoverName, setPopoverName] = useState("")
  const active = popoverName.length > 0

  const spawn = () => {
    const { current: anchor } = ref
    if (!anchor || popoverName) return

    const name = `usePopover#${getUniqueId()}`
    setPopoverName(name)

    manager.spawn({
      name,
      placement,
      anchor,
      render,
      onDismiss: () => setPopoverName(""),
    })
  }

  const dismiss = useCallback(() => {
    if (active) {
      manager.dismiss(popoverName)
      setPopoverName("")
    }
  }, [active, manager, popoverName])

  const toggle = () => {
    if (active) {
      dismiss()
    } else {
      spawn()
    }
  }

  useEffect(() => {
    if (active) {
      manager.update(popoverName, {
        placement,
        render,
      })
    }
  }, [active, placement, manager, popoverName, render])

  useEffect(() => () => dismiss(), [dismiss])

  return { active, dismiss, toggle, spawn }
}
