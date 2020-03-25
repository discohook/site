import { reaction } from "mobx"
import { useEffect } from "react"

export const useReaction = <T>(
  expression: () => T,
  effect: (value: T) => void,
) => {
  useEffect(() => {
    const disposer = reaction(expression, effect)
    return disposer
  })
}
