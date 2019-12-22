import { Backup } from "../backup/Backup"
import { base64Decode, base64Encode } from "../backup/base64"
import { parseJson } from "../json/parseJson"
import { applyIds } from "../message/applyIds"

export const setUrlToBackup = (backup: Backup) => {
  const files = backup.files.map(file => ({
    name: file.name,
    size: file.size,
    type: file.type,
  }))

  const json = JSON.stringify({ ...backup, files })
  const base64 = base64Encode(json, true)

  history.replaceState(undefined, "", `?backup=${base64}`)
}

export const decodeBackup = (base64: string) => {
  if (!base64) return

  const json = base64Decode(base64)
  if (!json) {
    if (!SERVER) console.error("Shared backup contained invalid base 64 data")
    return
  }

  const { value: parsedJson, error } = parseJson(json)
  if (error) {
    if (!SERVER) console.error("Shared backup parse error:", error)
    return
  }

  const backup = parsedJson as Backup
  const message = applyIds(backup.message)

  return {
    ...backup,
    message,
  }
}
