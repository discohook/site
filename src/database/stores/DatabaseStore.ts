import { IDBPDatabase, openDB } from "idb"
import { computed, observable } from "mobx"
import { InitializableStore } from "../../state/classes/InitializableStore"
import { Stores } from "../../state/types/Stores"
import { Schema } from "../types/Schema"

export class DatabaseStore extends InitializableStore<Stores> {
  database!: IDBPDatabase<Schema>

  @observable persisted = false

  @observable persistenceMessageDismissed = false

  async initialize() {
    if (SERVER) return

    this.persisted =
      "storage" in navigator && (await navigator.storage.persisted())

    this.database = await openDB<Schema>("discohook", 1, {
      upgrade: (database, oldVersion) => {
        // Casting to unknown schema, because upgrades shouldn't assume how the
        // schema looks at that time
        this.upgradeDatabase(database as IDBPDatabase, oldVersion)
      },
    })
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

  // eslint-disable-next-line class-methods-use-this
  private upgradeDatabase(database: IDBPDatabase, oldVersion: number) {
    if (oldVersion < 1) {
      database.createObjectStore("backups")
    }
  }

  @computed get shouldShowPersistenceWarning() {
    return !this.persisted && !this.persistenceMessageDismissed
  }
}
