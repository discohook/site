import { createContext } from "react"
import type { Modal } from "./Modal"

export const ModalContext = createContext<Modal | null>(null)

ModalContext.displayName = "ModalContext"

export const ModalProvider = ModalContext.Provider
