import { createContext } from "react"
import type { Manager } from "../types/Manager"

export const ManagerContext = createContext<Manager | undefined>(undefined)

export const ManagerProvider = ManagerContext.Provider
