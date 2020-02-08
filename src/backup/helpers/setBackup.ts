import { Backup } from "../types/Backup"
import { runTransaction } from "./runTransaction"

export const setBackup = async (name: string, backup: Backup) => {
  await runTransaction("readwrite", store => store.put(backup, name))
}
