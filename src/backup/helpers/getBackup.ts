import { applyIds } from "../../message/helpers/applyIds"
import { Backup } from "../types/Backup"
import { runTransaction } from "./runTransaction"

export const getBackup = async (name: string) => {
  const request = await runTransaction("readonly", store => store.get(name))
  const backup: Backup | undefined = request.result
  if (!backup) return

  return {
    ...backup,
    message: applyIds(backup.message),
  }
}
