import { IDBPDatabase, IDBPTransaction, openDB } from "idb"
import type { Schema } from "../Schema"
import { showUpgradeBlockedMessage } from "./showUpgradeBlockedMessage"
import { upgradeDatabase } from "./upgradeDatabase"

export const openDatabase = async () => {
  return openDB<Schema>("discohook", 10, {
    upgrade: (database, oldVersion, newVersion, transaction) => {
      // Casting to unknown schema, because upgrades shouldn't assume how the
      // schema looks at that time
      upgradeDatabase(
        database as IDBPDatabase,
        transaction as IDBPTransaction<unknown, string[], "versionchange">,
        oldVersion,
      )
        .then(() => {
          localStorage.setItem("database-upgraded-version", "10")
          document.querySelector("#db-upgrade-blocked")?.remove()
        })
        .catch(error => {
          console.error("Error on database upgrade:", error)
        })
    },
    blocked: showUpgradeBlockedMessage,
  })
}
