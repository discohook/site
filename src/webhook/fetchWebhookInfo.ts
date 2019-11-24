import { toCamelCase } from "../json/objectCasing"
import { Webhook } from "./Webhook"
import { webhookUrlRegex } from "./webhookUrlRegex"

export const fetchWebhookInfo = async (
  url: string,
): Promise<Webhook | undefined> => {
  if (!webhookUrlRegex.test(url)) return

  const response = await fetch(url)

  if (response.status !== 200) return

  const json = JSON.parse(await response.text())
  if (typeof json === "object" && json !== null) {
    return toCamelCase(json) as Webhook
  }
}
