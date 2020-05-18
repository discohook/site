import type { Placement } from "@popperjs/core"
import type { ReactNode } from "react"

export type Popover = {
  name: string
  placement: Placement
  anchor: HTMLElement
  render: () => ReactNode
  onDismiss?: () => void
}
