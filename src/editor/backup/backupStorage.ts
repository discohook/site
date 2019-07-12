import { Message } from "../../message/Message"
import { getUniqueId, id } from "../../uid"

export interface Backup {
  message: Message
  files: string[]
}

const dbPromise = new Promise<IDBDatabase>((res, rej) => {
  if (typeof indexedDB === "undefined") rej()
  const openRequest = indexedDB.open("backups", 1)

  openRequest.addEventListener("success", () => res(openRequest.result))
  openRequest.addEventListener("error", () => rej(openRequest.error))

  openRequest.addEventListener("upgradeneeded", () =>
    openRequest.result.createObjectStore("backupStore"),
  )
})

let db!: IDBDatabase
dbPromise.then(database => (db = database)).catch(() => {})

const runTransaction = async (
  mode: IDBTransactionMode,
  callback: (store: IDBObjectStore) => void,
) => {
  await dbPromise

  return new Promise((res, rej) => {
    const transaction = db.transaction("backupStore", mode)

    transaction.addEventListener("complete", () => res())
    transaction.addEventListener("error", () => rej(transaction.error))
    transaction.addEventListener("abort", () => rej(transaction.error))

    callback(transaction.objectStore("backupStore"))
  })
}

export const getBackups = async () => {
  const keys: IDBValidKey[] = []

  await runTransaction("readonly", store => {
    const cursor = store.openKeyCursor || store.openCursor
    const request = cursor.call(store)

    request.addEventListener("success", () => {
      if (!request.result) return
      keys.push(request.result!.key)
      request.result.continue()
    })

    request.addEventListener("error", () => {
      throw request.error
    })
  })

  return keys as string[]
}

export const setBackup = async (name: string, backup: Backup) => {
  await runTransaction("readwrite", store => store.put(backup, name))
}

export const getBackup = async (name: string) => {
  let request: IDBRequest
  await runTransaction("readonly", store => (request = store.get(name)))

  const backup: Backup = request!.result

  for (const embed of backup.message.embeds || []) {
    embed[id] = getUniqueId()
    for (const field of embed.fields || []) {
      field[id] = getUniqueId()
    }
  }

  return backup
}

export const deleteBackup = async (name: string) => {
  await runTransaction("readwrite", store => store.delete(name))
}
