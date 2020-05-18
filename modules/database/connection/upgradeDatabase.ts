/* eslint-disable no-await-in-loop */

import type { IDBPDatabase, IDBPTransaction } from "idb"
import { toSnakeCase } from "../../../common/object/toSnakeCase"

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
  }

  if (oldVersion < 4 && oldVersion >= 1) {
    const backupStore = transaction.objectStore("backup")

    const existingBackups = new Set<IDBValidKey>()
    let nameCursor = await backupStore.index("name").openKeyCursor()

    while (nameCursor) {
      existingBackups.add(nameCursor.key)
      nameCursor = await nameCursor.continue()
    }

    let cursor = await transaction.objectStore("backups").openCursor()

    while (cursor) {
      if (!existingBackups.has(cursor.key)) {
        await backupStore.put({
          ...cursor.value,
          name: cursor.key,
          message: toSnakeCase(cursor.value.message),
        })
      }

      cursor = await cursor.continue()
    }
  }
}
