import { useEffect, useRef, useState } from "react"
import ResizeObserver from "resize-observer-polyfill"
import { useLazyValue } from "../state/useLazyValue"

export const useMeasure = () => {
  const ref = useRef<never>(null)

  const [bounds, setBounds] = useState({ left: 0, top: 0, width: 0, height: 0 })

  const observer = useLazyValue(() => {
    return new ResizeObserver(([entry]) => setBounds(entry.contentRect))
  })

  useEffect(() => {
    if (ref.current as unknown) {
      observer.observe((ref.current as unknown) as Element)
    }

    return () => {
      observer.disconnect()
    }
  }, [observer])

  return [ref, bounds] as const
}
