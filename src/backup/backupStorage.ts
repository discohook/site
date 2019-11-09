import { applyIds } from "../message/applyIds"
import { Backup } from "./Backup"

const databasePromise = new Promise<IDBDatabase>((resolve, reject) => {
  if (typeof indexedDB === "undefined") reject()
  const openRequest = indexedDB.open("backups", 1)

  openRequest.addEventListener("success", () => resolve(openRequest.result))
  openRequest.addEventListener("error", () => reject(openRequest.error))

  openRequest.addEventListener("upgradeneeded", () =>
    openRequest.result.createObjectStore("backupStore"),
  )
})

let database!: IDBDatabase
databasePromise
  .then(idb => (database = idb))
  .catch(error => {
    // If indexedDB is not defined
    if (!error) return
    console.error("Error opening database:", error)
  })

const runTransaction = async <T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => T,
) => {
  await databasePromise

  return new Promise<T>((resolve, reject) => {
    const transaction = database.transaction("backupStore", mode)

    const result = {} as { value: T }

    transaction.addEventListener("complete", () => resolve(result.value))
    transaction.addEventListener("error", () => reject(transaction.error))
    transaction.addEventListener("abort", () => reject(transaction.error))

    result.value = fn(transaction.objectStore("backupStore"))
  })
}

export const getBackups = async () => {
  const keys: IDBValidKey[] = []

  await runTransaction("readonly", store => {
    // eslint-disable-next-line @typescript-eslint/unbound-method, @typescript-eslint/no-unnecessary-condition
    const request = (store.openKeyCursor ?? store.openCursor).call(store)

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
  const backup: Backup | undefined = request.result
  if (!backup) return

  backup.message = applyIds(backup.message)

  return backup
}

export const deleteBackup = async (name: string) => {
  await runTransaction("readwrite", store => store.delete(name))
}
