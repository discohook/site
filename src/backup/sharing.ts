import { parseJson } from "../json/parseJson"
import { applyIds } from "../message/applyIds"
import { Backup } from "./Backup"
import { getBackup } from "./backupStorage"
import { base64Decode, base64Encode } from "./base64"

export const shareBackup = async (name: string) => {
  const backup = await getBackup(name)

  const json = JSON.stringify(backup)
  const base64 = base64Encode(json)

  window.history.replaceState(undefined, "", `?backup=${base64}`)
}

const decodeBackup = (base64: string) => {
  const json = base64Decode(base64)
  if (!json) {
    console.log("Shared backup base64 contains an invalid character")
    return
  }

  const { value: parsedJson, error } = parseJson(json)
  if (error) {
    console.group("Shared backup JSON parse error:", error)
    console.log(json)
    console.groupEnd()
    return
  }

  const backup = parsedJson as Backup
  const message = applyIds(backup.message)

  return {
    ...backup,
    message,
  }
}

export const getSharedBackup = (url: URL) => {
  const backupParameter = url.searchParams.get("backup")
  const backup = decodeBackup(backupParameter || "")

  if (!process.env.SSR && backup) {
    console.log("Loaded with shared backup:", backup)
  }

  return backup
}
