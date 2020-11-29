import type { Placement } from "@popperjs/core"
import type { ReactNode, RefObject } from "react"

export type Popover = {
  name: string
  placement: Placement
  anchor: HTMLElement
  shards: RefObject<HTMLElement>[]
  render: () => ReactNode
  onDismiss?: () => void
}
