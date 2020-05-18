import { base64Encode } from "./base64Encode"

export const base64UrlEncode = (utf8: string) => {
  return base64Encode(utf8)
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=/g, "")
}
