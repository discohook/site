import { Backup } from "../backup/Backup"
import { base64Decode, base64Encode } from "../backup/base64"
import { parseJson } from "../json/parseJson"
import { applyIds } from "../message/applyIds"
import { SERVER } from "./environment"

export const setUrlToBackup = (backup: Backup) => {
  const json = JSON.stringify(backup)
  const base64 = base64Encode(json, true)

  history.replaceState(undefined, "", `?backup=${base64}`)
}

export const decodeBackup = (base64: string) => {
  if (!base64) return

  const json = base64Decode(base64)
  if (!json) {
    if (!SERVER) console.error("Shared backup contained invalid base 64")
    return
  }

  const { value: parsedJson, error } = parseJson(json)
  if (error) {
    if (!SERVER) console.error("Shared backup JSON parse error:", error)
    return
  }

  const backup = parsedJson as Backup
  const message = applyIds(backup.message)

  return {
    ...backup,
    message,
  }
}
