import { ChangeEvent, createContext } from "react"

export type RadioContextType = {
  id: string
  selected: string
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export const RadioContext = createContext<RadioContextType | null>(null)

RadioContext.displayName = "RadioContext"

export const RadioProvider = RadioContext.Provider
