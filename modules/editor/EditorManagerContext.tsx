import { createContext } from "react"
import type { EditorManager } from "./EditorManager"

export const EditorManagerContext = createContext<EditorManager | null>(null)
EditorManagerContext.displayName = "EditorManagerContext"

export const EditorManagerProvider = EditorManagerContext.Provider
