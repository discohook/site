import { Placement } from "@popperjs/core"
import { ReactNode } from "react"

export type Popover = {
  name: string
  placement: Placement
  anchor: HTMLElement
  render: () => ReactNode
  onDismiss?: () => void
}
