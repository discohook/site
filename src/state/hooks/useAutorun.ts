import { autorun } from "mobx"
import { useEffect } from "react"

export const useAutorun = (fn: () => void) => {
  useEffect(() => {
    const disposer = autorun(fn)
    return disposer
  })
}
