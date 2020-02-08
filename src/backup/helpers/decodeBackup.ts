import { base64Decode } from "../../base64/helpers/base64Decode"
import { parseJson } from "../../json/helpers/parseJson"
import { applyIds } from "../../message/helpers/applyIds"
import { Backup } from "../types/Backup"

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
