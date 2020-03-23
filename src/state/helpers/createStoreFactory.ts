import type { InitializableStore } from "../classes/InitializableStore"
import type { StoreManager } from "../classes/StoreManager"

export const createStoreFactory = <
  S extends Record<string, InitializableStore<S>>,
  M extends StoreManager<S>,
  T extends InitializableStore<S>
>(
  Store: new (manager: M) => T,
) => {
  return (manager: M) => new Store(manager)
}
