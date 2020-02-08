export const base64Decode = (urlSafeBase64: string) => {
  const base64 = urlSafeBase64.replace(/-/g, "+").replace(/_/g, "/")

  if (SERVER) {
    return Buffer.from(base64, "base64").toString("utf8")
  }

  try {
    const encoded = atob(base64)
      .split("")
      .map(char => char.charCodeAt(0).toString(16))
      .map(hex => `%${hex.padStart(2, "0").slice(-2)}`)
      .join("")

    return decodeURIComponent(encoded)
  } catch {
    return undefined
  }
}
