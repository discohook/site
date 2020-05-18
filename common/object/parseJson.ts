import type { JsonType } from "./JsonType"

export const parseJson = (json: string) => {
  try {
    return { value: JSON.parse(json) as JsonType }
  } catch (error) {
    const message = error.message.replace(/^JSON\.parse: /, "")
    return { error: message as string }
  }
}
