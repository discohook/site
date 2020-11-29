import type { ParsedUrlQuery } from "querystring"
import { base64Decode } from "../../common/base64/base64Decode"
import { parseJson } from "../../common/object/parseJson"
import { toSnakeCase } from "../../common/object/toSnakeCase"
import { messageOf } from "../message/helpers/messageOf"
import type { MessageData } from "../message/state/data/MessageData"
import { DEFAULT_EDITOR_MANAGER_STATE } from "./defaultEditorManagerState"
import { EditorManager } from "./EditorManager"

export const getEditorManagerFromQuery = (query: ParsedUrlQuery) => {
  const { value, error } = parseJson(
    base64Decode(String(query.data ?? query.message ?? "")) ?? "",
  )

  if (error || !value || typeof value !== "object") {
    return EditorManager.create(DEFAULT_EDITOR_MANAGER_STATE)
  }

  if ("message" in value) {
    return EditorManager.create({
      messages: [messageOf(toSnakeCase(value.message) as MessageData)],
    })
  }

  if (!("messages" in value) || !Array.isArray(value.messages)) {
    return EditorManager.create(DEFAULT_EDITOR_MANAGER_STATE)
  }

  return EditorManager.create({
    messages: value.messages.map(message => {
      if (typeof message !== "object" || !message || !("data" in message)) {
        return {}
      }

      return messageOf(message.data as MessageData)
    }),
  })
}
