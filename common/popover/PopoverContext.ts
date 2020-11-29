import { createContext } from "react"
import type { Popover } from "./Popover"

export const PopoverContext = createContext<Popover | null>(null)

PopoverContext.displayName = "PopoverContext"

export const PopoverProvider = PopoverContext.Provider
