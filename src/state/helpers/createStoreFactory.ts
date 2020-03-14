import { InitializableStore } from "../classes/InitializableStore"
import { Manager } from "../types/Manager"

export const createStoreFactory = <S extends InitializableStore>(
  Store: new (manager: Manager) => S,
) => {
  return (manager: Manager) => new Store(manager)
}
