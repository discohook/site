import { openDatabase } from "./openDatabase"

export const runTransaction = async <T>(
  mode: IDBTransactionMode,
  fn: (store: IDBObjectStore) => T,
) =>
  openDatabase()
    .then(
      async database =>
        new Promise<T>((resolve, reject) => {
          const transaction = database.transaction("backupStore", mode)

          const result = {} as { value: T }

          transaction.addEventListener("complete", () => resolve(result.value))
          transaction.addEventListener("error", () => reject(transaction.error))
          transaction.addEventListener("abort", () => reject(transaction.error))

          result.value = fn(transaction.objectStore("backupStore"))

          database.close()
        }),
    )
    .catch(error => {
      console.error("Could not run transaction", error)
      throw error
    })
