/* eslint-disable unicorn/no-useless-undefined */

import type { Placement } from "@popperjs/core"
import { ReactNode, RefObject, useCallback, useEffect, useState } from "react"
import { getUniqueId } from "../state/uid"
import { useRequiredContext } from "../state/useRequiredContext"
import { PopoverManagerContext } from "./PopoverManagerContext"

export type UsePopoverOptions = {
  ref: RefObject<HTMLElement>
  render: () => ReactNode
  placement: Placement
  shards?: RefObject<HTMLElement>[]
}

export const usePopover = (options: UsePopoverOptions) => {
  const { ref, render, placement, shards = [] } = options

  const manager = useRequiredContext(PopoverManagerContext)

  const [popoverName, setPopoverName] = useState<string>()

  const spawn = () => {
    const { current: anchor } = ref
    if (!anchor || popoverName) return

    const name = `usePopover#${getUniqueId()}`
    setPopoverName(name)

    manager.spawn({
      name,
      placement,
      anchor,
      shards,
      render,
      onDismiss: () => setPopoverName(undefined),
    })
  }

  const dismiss = useCallback(() => {
    if (popoverName) {
      manager.dismiss(popoverName)
      setPopoverName(undefined)
    }
  }, [manager, popoverName])

  const toggle = () => {
    if (popoverName) {
      dismiss()
    } else {
      spawn()
    }
  }

  useEffect(() => {
    if (popoverName) {
      manager.update(popoverName, {
        placement,
        render,
      })
    }
  })

  useEffect(() => () => dismiss(), [dismiss])

  return {
    active: Boolean(popoverName),
    dismiss,
    toggle,
    spawn,
  }
}
