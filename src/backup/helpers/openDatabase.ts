export const openDatabase = async () =>
  new Promise<IDBDatabase>((resolve, reject) => {
    if (typeof indexedDB === "undefined") {
      reject(new ReferenceError("indexedDB is not defined"))
    }

    const openRequest = indexedDB.open("backups", 1)

    openRequest.addEventListener("success", () => resolve(openRequest.result))
    openRequest.addEventListener("error", () => reject(openRequest.error))

    openRequest.addEventListener("upgradeneeded", () =>
      openRequest.result.createObjectStore("backupStore"),
    )
  }).catch(error => {
    console.error("Could not open database", error)
    throw error
  })
