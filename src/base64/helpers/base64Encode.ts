export const base64Encode = (utf8: string, safe = false) => {
  if (SERVER) {
    let base64 = Buffer.from(utf8, "utf8").toString("base64")

    if (safe) {
      base64 = base64
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "")
    }

    return base64
  }

  const encoded = encodeURIComponent(utf8)

  const escaped = encoded.replace(/%[\dA-F]{2}/g, hex => {
    return String.fromCharCode(parseInt(hex.slice(1), 16))
  })

  let base64 = btoa(escaped)

  if (safe) {
    base64 = base64
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "")
  }

  return base64
}
