import type { Placement } from "@popperjs/core"
import { ReactNode, RefObject, useCallback, useEffect, useState } from "react"
import { getUniqueId } from "../../message/helpers/getUniqueId"
import { useStores } from "../../state/hooks/useStores"

export type UsePopoverOptions = {
  ref: RefObject<HTMLElement>
  render: () => ReactNode
  placement: Placement
}

export const usePopover = (options: UsePopoverOptions) => {
  const { ref, render, placement } = options

  const { popoverStore } = useStores()
  const [popoverName, setPopoverName] = useState("")

  const spawn = useCallback(() => {
    const { current: anchor } = ref
    if (!anchor || popoverName) return

    const name = `usePopover(${getUniqueId()})`
    setPopoverName(name)

    popoverStore.spawn({
      name,
      placement,
      anchor,
      render,
      onDismiss: () => setPopoverName(""),
    })
  }, [placement, popoverName, popoverStore, ref, render])

  const dismiss = useCallback(() => {
    if (popoverName) {
      popoverStore.dismiss(popoverName)
      setPopoverName("")
    }
  }, [popoverName, popoverStore])

  const toggle = () => {
    if (popoverName) {
      dismiss()
    } else {
      spawn()
    }
  }

  useEffect(() => {
    if (popoverName) {
      popoverStore.update(popoverName, { placement, render })
    }
  }, [placement, popoverName, popoverStore, render])

  useEffect(() => {
    return () => {
      dismiss()
    }
  }, [dismiss])

  return {
    active: popoverName.length > 0,
    dismiss,
    toggle,
    spawn,
  }
}
