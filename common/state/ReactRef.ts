import type { MutableRefObject } from "react"

export type ReactRef<T> =
  | ((instance: T | null) => void)
  | MutableRefObject<T | null>
  | null
