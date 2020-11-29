import { createContext } from "react"
import type { BackupManager } from "./BackupManager"

export const BackupManagerContext = createContext<BackupManager | null>(null)

BackupManagerContext.displayName = "BackupManagerContext"

export const BackupManagerProvider = BackupManagerContext.Provider
