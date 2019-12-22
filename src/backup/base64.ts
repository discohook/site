export const base64Encode = (data: string, safe = false) => {
  if (SERVER) {
    let base64 = Buffer.from(data, "utf8").toString("base64")

    if (safe) {
      base64 = base64
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=/g, "")
    }

    return base64
  }

  const encoded = encodeURIComponent(data)

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

export const base64Decode = (base64: string) => {
  const data = base64.replace(/-/g, "+").replace(/_/g, "/")

  if (SERVER) {
    return Buffer.from(data, "base64").toString("utf8")
  }

  try {
    const encoded = atob(data)
      .split("")
      .map(char => char.charCodeAt(0).toString(16))
      .map(hex => `%${hex.padStart(2, "0").slice(-2)}`)
      .join("")

    return decodeURIComponent(encoded)
  } catch {
    // do nothing
  }
}
