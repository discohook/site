import { createContext } from "react"
import type { DatabaseManager } from "./DatabaseManager"

export const DatabaseManagerContext = createContext<DatabaseManager | null>(
  null,
)

DatabaseManagerContext.displayName = "DatabaseManagerContext"

export const DatabaseManagerProvider = DatabaseManagerContext.Provider
