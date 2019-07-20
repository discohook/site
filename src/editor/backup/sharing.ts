import { applyIds } from "../json/applyIds"
import { Backup } from "./Backup"
import { getBackup } from "./backupStorage"

export const shareBackup = async (name: string) => {
  const backup = await getBackup(name)

  const json = JSON.stringify(backup)
  const escaped = encodeURIComponent(json)
  const base64 = btoa(escaped)

  window.history.replaceState(undefined, "", `?backup=${base64}`)
}

const decodeBackup = (base64: string) => {
  try {
    const escaped = process.env.SSR
      ? Buffer.from(base64, "base64").toString("binary")
      : atob(base64)
    const unescaped = decodeURIComponent(escaped)
    const backup = JSON.parse(unescaped) as Backup

    const message = applyIds(backup.message)

    return {
      ...backup,
      message,
    }
  } catch {
    return null
  }
}

let cachedBackup: undefined | null | Backup

export const getSharedBackup = (url: URL) => {
  if (cachedBackup !== undefined) return cachedBackup

  const backupParam = url.searchParams.get("backup")
  const backup = decodeBackup(backupParam || "")

  if (!process.env.SSR) {
    if (backup) console.log("Loaded with shared backup:", backup)
    cachedBackup = backup
  }

  return backup
}
