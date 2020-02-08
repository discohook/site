import { toASCII } from "punycode"
import { format, parse } from "url"

export const depunycode = (link: string) => {
  try {
    const url = parse(link)
    const { hostname, protocol } = url

    if (["file:"].includes(protocol?.toLowerCase() ?? "")) return
    if (!hostname) return

    const asciiHostname = toASCII(hostname)

    return format({
      ...url,
      hostname: asciiHostname,
      protocol,
    })
  } catch {
    return undefined
  }
}
