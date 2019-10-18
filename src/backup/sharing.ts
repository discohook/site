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

export const decodeBackup = (base64: string) => {
  if (!base64) return

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
