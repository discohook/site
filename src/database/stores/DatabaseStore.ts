import type { IDBPDatabase } from "idb"
import { computed, observable } from "mobx"
import { InitializableStore } from "../../state/classes/InitializableStore"
import type { Stores } from "../../state/types/Stores"
import { openDatabase } from "../helpers/openDatabase"
import type { Schema } from "../types/Schema"

export class DatabaseStore extends InitializableStore<Stores> {
  database!: IDBPDatabase<Schema>

  @observable persisted = false

  @observable persistenceMessageDismissed = false

  async initialize() {
    if (SERVER) return

    this.persisted =
      "storage" in navigator && (await navigator.storage.persisted())

    this.database = await openDatabase()
  }

  async requestPersistence() {
    if ("chrome" in window) {
      await new Promise((resolve, reject) => {
        Notification.requestPermission(resolve).then(resolve).catch(reject)
      })
    }

    this.persisted =
      "storage" in navigator && (await navigator.storage.persist())
  }

  @computed get shouldShowPersistenceWarning() {
    return !this.persisted && !this.persistenceMessageDismissed
  }
}
