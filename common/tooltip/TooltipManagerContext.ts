import { createContext } from "react"
import type { TooltipManager } from "./TooltipManager"

export const TooltipManagerContext = createContext<TooltipManager | null>(null)

TooltipManagerContext.displayName = "TooltipManagerContext"

export const TooltipManagerProvider = TooltipManagerContext.Provider
