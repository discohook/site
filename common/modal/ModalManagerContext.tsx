import { createContext } from "react"
import type { ModalManager } from "./ModalManager"

export const ModalManagerContext = createContext<ModalManager | null>(null)

ModalManagerContext.displayName = "ModalManagerContext"

export const ModalManagerProvider = ModalManagerContext.Provider
