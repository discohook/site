import { ReactElement, ReactNode, RefObject, useEffect, useRef } from "react"
import { useRequiredContext } from "../state/useRequiredContext"
import { TooltipManagerContext } from "./TooltipManagerContext"

export type TooltipWrapperProps = {
  label: ReactNode
  children: (ref: RefObject<never>) => ReactNode
}

export function TooltipWrapper(props: TooltipWrapperProps) {
  const { label, children } = props

  const manager = useRequiredContext(TooltipManagerContext)

  const anchorRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const { current: anchor } = anchorRef
    if (!anchor) return

    const dismiss = manager.add({
      anchor,
      content: label,
    })

    return () => {
      dismiss()
    }
  }, [label, manager])

  return children(anchorRef as RefObject<never>) as ReactElement
}
