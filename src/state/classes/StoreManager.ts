import { InitializableStore } from "./InitializableStore"

export class StoreManager<T extends Record<string, InitializableStore>> {
  stores: T = {} as T

  constructor(
    factories: { [K in keyof T]: (manager: StoreManager<T>) => T[K] },
  ) {
    for (const [name, factory] of Object.entries(factories)) {
      this.stores[name as keyof T] = factory(this)
    }
  }

  async initialize() {
    await Promise.all(
      Object.values(this.stores).map(async store => {
        await store.initializeStore()
      }),
    )
  }
}
