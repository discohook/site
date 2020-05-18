import { useRef } from "react"

const UNINITIALISED = Symbol()

export const useLazyValue = <T>(initializer: () => T) => {
  const ref = useRef((UNINITIALISED as unknown) as T)

  if (ref.current === (UNINITIALISED as unknown)) {
    ref.current = initializer()
  }

  return ref.current
}
