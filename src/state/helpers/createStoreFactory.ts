import { InitialisableStore } from "../classes/InitialisableStore"
import { Manager } from "../types/Manager"

export const createStoreFactory = <S extends InitialisableStore>(
  Store: new (manager: Manager) => S,
) => {
  return (manager: Manager) => new Store(manager)
}
