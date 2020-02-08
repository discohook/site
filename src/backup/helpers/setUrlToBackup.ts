import { base64UrlEncode } from "../../base64/helpers/base64UrlEncode"
import { Backup } from "../types/Backup"

export const setUrlToBackup = (backup: Backup) => {
  const files = backup.files.map(file => ({
    name: file.name,
    size: file.size,
    type: file.type,
  }))

  const json = JSON.stringify({ ...backup, files })
  const base64 = base64UrlEncode(json)

  history.replaceState(undefined, "", `?backup=${base64}`)
}
