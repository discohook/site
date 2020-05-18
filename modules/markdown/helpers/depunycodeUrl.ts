import { toASCII } from "punycode"
import * as URL from "url"

export const depunycodeUrl = (link: string) => {
  try {
    const url = URL.parse(link)
    const { hostname, protocol } = url

    if (protocol?.toLowerCase() === "file:") return
    if (!hostname) return

    const asciiHostname = toASCII(hostname)

    return URL.format({
      ...url,
      hostname: asciiHostname,
      protocol,
    })
  } catch {
    return undefined
  }
}
