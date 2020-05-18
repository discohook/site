import { createContext } from "react"
import type { Modal } from "./Modal"

export const ModalContext = createContext<Modal | undefined>(undefined)
ModalContext.displayName = "ModalContext"

export const ModalProvider = ModalContext.Provider
