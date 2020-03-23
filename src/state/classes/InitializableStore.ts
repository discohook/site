/* eslint-disable class-methods-use-this */

import type { StoreManager } from "./StoreManager"

export class InitializableStore<
  S extends Record<string, InitializableStore<S, M>>,
  M extends StoreManager<S> = StoreManager<S>
> {
  protected manager: M

  initialized: Promise<void>
  private markAsInitialized!: () => void

  constructor(manager: M) {
    this.manager = manager

    this.initialized = new Promise(resolve => {
      this.markAsInitialized = resolve
    })
  }

  async initializeStore() {
    await this.initialize()
    this.markAsInitialized()
  }

  protected initialize(): void | Promise<void> {}
}
