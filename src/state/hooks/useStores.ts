import { useManager } from "./useManager"

export const useStores = () => {
  const manager = useManager()
  return manager.stores
}
