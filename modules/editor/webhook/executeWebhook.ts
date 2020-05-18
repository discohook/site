import { stringifyMessage } from "../../message/helpers/stringifyMessage"
import type { EditorManager } from "../EditorManager"

export const executeWebhook = async (editorManager: EditorManager) => {
  let body: string | FormData = stringifyMessage(
    editorManager.message.getMessageData(),
    false,
  )

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Accept-Language": "en",
  }

  if (editorManager.message.files.length > 0) {
    const formData = new FormData()

    if (body !== "{}") formData.append("payload_json", body)

    for (const [index, file] of editorManager.message.files.entries()) {
      if (file instanceof File) {
        formData.append(`file[${index}]`, file, file.name)
      }
    }

    body = formData
    delete headers["Content-Type"]
  }

  try {
    const response = await fetch(`${editorManager.webhook.url}?wait=true`, {
      method: "POST",
      body,
      headers,
    })

    console.log("Webhook executed:", await response.json())
  } catch (error) {
    console.error("Network error while executing webhook:", error)
    throw error
  }
}
