import { createContext } from "react"
import { Manager } from "../types/Manager"

export const ManagerContext = createContext<Manager | undefined>(undefined)

export const ManagerProvider = ManagerContext.Provider
