import { getUniqueId, id } from "../../uid"
import { Backup } from "./Backup"

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

const runTransaction = async <T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => T,
) => {
  await dbPromise

  return new Promise<T>((res, rej) => {
    const transaction = db.transaction("backupStore", mode)

    const result = {} as { value: T }

    transaction.addEventListener("complete", () => res(result.value))
    transaction.addEventListener("error", () => rej(transaction.error))
    transaction.addEventListener("abort", () => rej(transaction.error))

    result.value = fn(transaction.objectStore("backupStore"))
  })
}

export const getBackups = async () => {
  const keys: IDBValidKey[] = []

  await runTransaction("readonly", store => {
    // eslint-disable-next-line @typescript-eslint/unbound-method
    const request = (store.openKeyCursor || store.openCursor).call(store)

    request.addEventListener("success", () => {
      if (!request.result) return
      keys.push(request.result.key)
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
  const request = await runTransaction("readonly", store => store.get(name))
  const backup: Backup = request.result

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
