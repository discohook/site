import type { InitializableStore } from "./InitializableStore"

export class StoreManager<S extends Record<string, InitializableStore<S>>> {
  stores: S = {} as S

  constructor(
    factories: { [K in keyof S]: (manager: StoreManager<S>) => S[K] },
  ) {
    for (const [name, factory] of Object.entries(factories)) {
      this.stores[name as keyof S] = factory(this)
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
