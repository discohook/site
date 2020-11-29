import { createContext } from "react"
import type { PopoverManager } from "./PopoverManager"

export const PopoverManagerContext = createContext<PopoverManager | null>(null)

PopoverManagerContext.displayName = "PopoverManagerContext"

export const PopoverManagerProvider = PopoverManagerContext.Provider
