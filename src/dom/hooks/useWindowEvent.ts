import { useEffect } from "react"

export const useWindowEvent = <K extends keyof WindowEventMap>(
  type: K,
  listener: (event: WindowEventMap[K]) => void,
  options?: AddEventListenerOptions,
) => {
  useEffect(() => {
    window.addEventListener(type, listener, options)

    return () => {
      window.removeEventListener(
        type,
        listener,
        options as EventListenerOptions,
      )
    }
  })
}
