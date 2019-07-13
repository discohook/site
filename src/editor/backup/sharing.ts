import { b64urlDecode, b64urlEncode } from "@waiting/base64"
import { Backup } from "./Backup"
import { getBackup } from "./backupStorage"

export const shareBackup = async (name: string) => {
  const backup = await getBackup(name)
  const base64 = b64urlEncode(JSON.stringify(backup))
  window.history.replaceState(undefined, "", `?backup=${base64}`)
}

let backup: Backup | undefined

if (!process.env.SSR && location.search.startsWith("?backup=")) {
  try {
    backup = JSON.parse(b64urlDecode(location.search.substring(8)))
    console.log("Loaded with shared backup:", backup)
  } catch {}
}

export const getSharedBackup = (url?: URL) => {
  if (!url) return backup

  if (url.searchParams.has("backup")) {
    try {
      return JSON.parse(b64urlDecode(url.searchParams.get("backup")!))
    } catch {}
  }
}
