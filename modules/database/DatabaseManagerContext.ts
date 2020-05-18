import { createContext } from "react"
import type { DatabaseManager } from "./DatabaseManager"

export const DatabaseManagerContext = createContext<
  DatabaseManager | undefined
>(undefined)

DatabaseManagerContext.displayName = "DatabaseManagerContext"

export const DatabaseManagerProvider = DatabaseManagerContext.Provider
