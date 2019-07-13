import { b64urlDecode } from "@waiting/base64"
import { Backup } from "./Backup"

let backup: Backup | undefined

if (typeof location === "object" && location.hash.startsWith("#backup:")) {
  try {
    backup = JSON.parse(b64urlDecode(location.hash.substring(8)))
  } catch {}
}

export const sharedBackup = backup
