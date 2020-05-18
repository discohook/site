import type { IDBPDatabase } from "idb"
import { computed, observable } from "mobx"
import { openDatabase } from "./connection/openDatabase"
import type { Schema } from "./Schema"

export class DatabaseManager {
  initialized: Promise<void>
  database!: IDBPDatabase<Schema>

  @observable persisted = true
  @observable persistenceMessageDismissed = false

  constructor() {
    let markAsInitialized: () => void
    this.initialized = new Promise(resolve => {
      markAsInitialized = resolve
    })

    if (typeof window === "undefined") return

    if ("storage" in navigator) {
      navigator.storage
        .persisted()
        .then(persisted => {
          this.persisted = persisted
        })
        .catch(() => {})
    }

    openDatabase()
      .then(database => {
        this.database = database
        markAsInitialized()
      })
      .catch(error => {
        console.error("Failed to open database:", error)
      })
  }

  async requestPersistence() {
    if ("chrome" in window) {
      await Notification.requestPermission()
    }

    if ("storage" in navigator) {
      this.persisted = await navigator.storage.persist()
    }
  }

  @computed get shouldShowPersistenceWarning() {
    return !this.persisted && !this.persistenceMessageDismissed
  }
}
