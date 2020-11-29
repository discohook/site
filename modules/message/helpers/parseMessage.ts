import { parseJson } from "../../../common/object/parseJson"
import { isMessage } from "../../editor/data/validation/isMessage"
import type { MessageData } from "../state/data/MessageData"

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
