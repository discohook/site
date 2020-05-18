import { parseJson } from "../../../common/object/parseJson"
import type { MessageData } from "../data/MessageData"
import { isMessage } from "../validation/isMessage"

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
