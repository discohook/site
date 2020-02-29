import { useContext } from "react"
import { ManagerContext } from "../contexts/ManagerContext"

export const useManager = () => {
  const manager = useContext(ManagerContext)
  if (!manager) throw new Error("Manager not available in this context")
  return manager
}
