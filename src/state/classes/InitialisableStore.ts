/* eslint-disable class-methods-use-this */

import { Manager } from "../types/Manager"

export class InitializableStore {
  manager: Manager

  constructor(manager: Manager) {
    this.manager = manager
  }

  initialise(): void | Promise<void> {}
}
