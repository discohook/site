import { runTransaction } from "./runTransaction"

export const listBackups = async () => {
  const keys: IDBValidKey[] = []

  await runTransaction("readonly", store => {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const request = (store.openKeyCursor ?? store.openCursor).call(store)

    request.addEventListener("success", () => {
      if (!request.result) return
      keys.push(request.result.key)
      request.result.continue()
    })

    request.addEventListener("error", () => {
      throw new Error(String(request.error))
    })
  })

  return keys as string[]
}
