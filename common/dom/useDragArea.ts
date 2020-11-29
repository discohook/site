import { RefObject, useEffect } from "react"

const clamp = (number: number, ...range: [number, number]) =>
  Math.max(Math.min(number, Math.max(...range)), Math.min(...range))

export const useDragArea = (
  ref: RefObject<HTMLElement>,
  fn: (x: number, y: number) => void,
) => {
  useEffect(() => {
    const { current: element } = ref
    if (!element) return

    const handleDrag = (event: MouseEvent) => {
      const { left, top, width, height } = element.getBoundingClientRect()

      const x = clamp((event.clientX - left) / width, 0, 1)
      const y = clamp((event.clientY - top) / height, 0, 1)

      fn(x, y)
    }

    const handleDragStart = (event: MouseEvent) => {
      event.preventDefault()

      handleDrag(event)

      const handleDragEnd = () => {
        removeEventListener("mouseup", handleDragEnd)
        removeEventListener("mousemove", handleDrag)
      }

      addEventListener("mousemove", handleDrag)
      addEventListener("mouseup", handleDragEnd)
    }

    element.addEventListener("mousedown", handleDragStart)
    return () => element.removeEventListener("mousedown", handleDragStart)
  }, [fn, ref])
}
