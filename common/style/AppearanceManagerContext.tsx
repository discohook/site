import { createContext } from "react"
import type { AppearanceManager } from "./AppearanceManager"

export const AppearanceManagerContext = createContext<AppearanceManager | null>(
  null,
)

AppearanceManagerContext.displayName = "AppearanceManagerContext"

export const AppearanceManagerProvider = AppearanceManagerContext.Provider
