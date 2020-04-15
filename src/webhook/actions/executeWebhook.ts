import { stringifyMessage } from "../../json/helpers/stringifyMessage"
import type { Manager } from "../../state/types/Manager"
import { spawnNetworkErrorModal } from "./spawnNetworkErrorModal"

export const executeWebhook = async (manager: Manager) => {
  const { messageStore, webhookStore } = manager.stores

  let body: string | FormData = stringifyMessage(
    messageStore.message.getMessageData(),
    false,
  )

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "Accept": "application/json",
    "Accept-Language": "en",
  }

  if (messageStore.message.files.length > 0) {
    const formData = new FormData()

    if (body !== "{}") formData.append("payload_json", body)

    for (const [index, file] of messageStore.message.files.entries()) {
      if (file instanceof File) {
        formData.append(`file[${index}]`, file, file.name)
      }
    }

    body = formData
    delete headers["Content-Type"]
  }

  try {
    const response = await fetch(`${webhookStore.url}?wait=true`, {
      method: "POST",
      body,
      headers,
    })

    console.log("Webhook executed:", await response.json())
  } catch (error) {
    console.error("Network error while executing webhook:", error)
    spawnNetworkErrorModal(manager)
  }
}
