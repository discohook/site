import { createContext } from "react"
import type { BackupManager } from "./BackupManager"

export const BackupManagerContext = createContext<BackupManager | undefined>(
  undefined,
)

BackupManagerContext.displayName = "BackupManagerContext"

export const BackupManagerProvider = BackupManagerContext.Provider
