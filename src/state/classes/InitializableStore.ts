/* eslint-disable class-methods-use-this */

import { Manager } from "../types/Manager"

export class InitializableStore {
  initialized: Promise<void>
  private markAsInitialized!: () => void

  protected manager: Manager

  constructor(manager: Manager) {
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
