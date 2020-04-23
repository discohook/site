/* eslint-disable no-await-in-loop */

import type { IDBPDatabase, IDBPTransaction } from "idb"
import { toSnakeCase } from "../../json/helpers/toSnakeCase"

export const upgradeDatabase = async (
  database: IDBPDatabase,
  transaction: IDBPTransaction,
  oldVersion: number,
) => {
  if (oldVersion < 2 && oldVersion >= 1) {
    let cursor = await transaction.objectStore("backups").openCursor()

    while (cursor) {
      await cursor.update({
        name: cursor.key,
        message: cursor.value,
      })

      cursor = await cursor.continue()
    }
  }

  if (oldVersion < 3) {
    database.createObjectStore("backup", {
      keyPath: "id",
      autoIncrement: true,
    })

    const backupStore = transaction.objectStore("backup")
    backupStore.createIndex("name", "name", {
      unique: true,
    })

    if (oldVersion >= 1) {
      let cursor = await transaction.objectStore("backups").openCursor()

      while (cursor) {
        await backupStore.put({
          ...cursor.value,
          message: toSnakeCase(cursor.value.message),
        })

        cursor = await cursor.continue()
      }
    }
  }
}
