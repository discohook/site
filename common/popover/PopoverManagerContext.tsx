import { createContext } from "react"
import type { PopoverManager } from "./PopoverManager"

export const PopoverManagerContext = createContext<PopoverManager | undefined>(
  undefined,
)

PopoverManagerContext.displayName = "PopoverManagerContext"

export const PopoverManagerProvider = PopoverManagerContext.Provider
