import { base64Decode } from "../../../common/base64/base64Decode"
import { parseJson } from "../../../common/object/parseJson"
import { toSnakeCase } from "../../../common/object/toSnakeCase"
import { getUniqueId } from "../../../common/uid"
import type { MessageData } from "../data/MessageData"

export const decodeMessage = (base64: string) => {
  if (!base64) return

  const json = base64Decode(base64)

  if (!json) {
    if (typeof window !== "undefined") {
      console.error("Shared backup contained invalid base 64 data")
    }
    return
  }

  const { value, error } = parseJson(json)

  if (error) {
    if (typeof window !== "undefined") {
      console.error("Shared backup parse error:", error)
    }
    return
  }

  if (
    typeof value !== "object" ||
    value === null ||
    Array.isArray(value) ||
    typeof value.message !== "object" ||
    value.message === null ||
    Array.isArray(value.message)
  ) {
    return {}
  }

  value.message.id = getUniqueId()

  if (Array.isArray(value.message.embeds)) {
    for (const embed of value.message.embeds) {
      if (
        typeof embed === "object" &&
        embed !== null &&
        !Array.isArray(embed)
      ) {
        embed.id = getUniqueId()
      }
    }

    const fields = value.message.embeds.flatMap(embed => {
      if (
        typeof embed !== "object" ||
        embed === null ||
        Array.isArray(embed) ||
        typeof embed.fields !== "object" ||
        embed.fields === null ||
        !Array.isArray(embed.fields)
      ) {
        return []
      }

      return embed.fields
    })

    for (const field of fields) {
      if (
        typeof field === "object" &&
        field !== null &&
        !Array.isArray(field)
      ) {
        field.id = getUniqueId()
      }
    }
  }

  return toSnakeCase(value.message) as MessageData
}
