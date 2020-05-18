import { autorun } from "mobx"
import { useEffect } from "react"

export const useAutorun = (fn: () => void) => {
  useEffect(() => autorun(fn))
}
