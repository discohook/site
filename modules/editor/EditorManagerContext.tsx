import { createContext } from "react"
import type { EditorManagerLike } from "./EditorManager"

export const EditorManagerContext = createContext<EditorManagerLike | null>(
  null,
)

EditorManagerContext.displayName = "EditorManagerContext"

export const EditorManagerProvider = EditorManagerContext.Provider
