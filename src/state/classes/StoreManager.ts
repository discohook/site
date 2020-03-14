import { InitializableStore } from "./InitializableStore"

export class StoreManager<T extends Record<string, InitializableStore>> {
  stores: T = {} as T

  constructor(
    instantiators: { [K in keyof T]: (manager: StoreManager<T>) => T[K] },
  ) {
    for (const [name, instantiate] of Object.entries(instantiators)) {
      this.stores[name as keyof T] = instantiate(this)
    }
  }

  async initialise() {
    await Promise.all(
      Object.values(this.stores).map(async store => {
        await store.initialiseStore()
      }),
    )
  }
}
