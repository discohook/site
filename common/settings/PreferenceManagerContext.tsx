import { createContext } from "react"
import type { PreferenceManager } from "./PreferenceManager"

export const PreferenceManagerContext = createContext<PreferenceManager | null>(
  null,
)

PreferenceManagerContext.displayName = "PreferenceManagerContext"

export const PreferenceManagerProvider = PreferenceManagerContext.Provider
