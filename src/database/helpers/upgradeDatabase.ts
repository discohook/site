/* eslint-disable no-await-in-loop */

import type { IDBPDatabase, IDBPTransaction } from "idb"

export const upgradeDatabase = async (
  database: IDBPDatabase,
  transaction: IDBPTransaction,
  oldVersion: number,
) => {
  if (oldVersion < 1) {
    database.createObjectStore("backups")
  }

  if (oldVersion < 2) {
    let cursor = await transaction.objectStore("backups").openCursor()

    while (cursor) {
      await cursor.update({
        name: cursor.key,
        message: cursor.value,
      })

      cursor = await cursor.continue()
    }
  }
}
