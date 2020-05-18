import { createContext } from "react"
import type { ModalManager } from "./ModalManager"

export const ModalManagerContext = createContext<ModalManager | undefined>(
  undefined,
)

ModalManagerContext.displayName = "ModalManagerContext"

export const ModalManagerProvider = ModalManagerContext.Provider
