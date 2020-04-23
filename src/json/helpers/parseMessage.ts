import type { MessageData } from "../../message/types/MessageData"
import { isMessage } from "../validators/isMessage"
import { parseJson } from "./parseJson"

export const parseMessage = (json: string) => {
  const { value: parsedJson, error } = parseJson(json)
  if (error) {
    return { errors: [error] }
  }

  const errors = isMessage(parsedJson, "$")

  return {
    message: errors.length === 0 ? (parsedJson as MessageData) : undefined,
    errors,
  }
}
