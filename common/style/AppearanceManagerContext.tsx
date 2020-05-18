import { createContext } from "react"
import type { AppearanceManager } from "./AppearanceManager"

export const AppearanceManagerContext = createContext<
  AppearanceManager | undefined
>(undefined)

AppearanceManagerContext.displayName = "AppearanceManagerContext"

export const AppearanceManagerProvider = AppearanceManagerContext.Provider
