import { del, get, keys, set, Store } from "idb-keyval"
import { Message } from "../../message/Message"

export interface Backup {
  message: Message
  files: string[]
}

const backupStore = new Store("backups", "backupStore")

export const getBackups = async () => {
  return (await keys(backupStore)) as string[]
}

export const setBackup = async (name: string, backup: Backup) => {
  await set(name, backup, backupStore)
}

export const getBackup = async (name: string) => {
  return (await get(name, backupStore)) as Backup | undefined
}

export const deleteBackup = async (name: string) => {
  await del(name, backupStore)
}
