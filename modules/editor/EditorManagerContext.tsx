import { createContext } from "react"
import type { EditorManager } from "./EditorManager"

export const EditorManagerContext = createContext<EditorManager | undefined>(
  undefined,
)

EditorManagerContext.displayName = "EditorManagerContext"

export const EditorManagerProvider = EditorManagerContext.Provider
