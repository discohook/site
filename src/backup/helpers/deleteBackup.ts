import { runTransaction } from "./runTransaction"

export const deleteBackup = async (name: string) => {
  await runTransaction("readwrite", store => store.delete(name))
}
