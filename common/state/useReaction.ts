import { reaction } from "mobx"
import { useEffect } from "react"

export const useReaction = <T>(
  expression: () => T,
  effect: (value: T) => void,
) => {
  useEffect(() => reaction(expression, effect))
}
