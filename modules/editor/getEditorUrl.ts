import { base64UrlEncode } from "../../common/base64/base64UrlEncode"
import type { EditorManagerLike } from "./EditorManager"

export const getEditorUrl = (manager: EditorManagerLike) => {
  const messages = manager.messages.map(message => ({
    data: message.data,
  }))

  const json = JSON.stringify({ messages })
  const base64 = base64UrlEncode(json)

  return String(new URL(`https://discohook.org/?data=${base64}`))
}
