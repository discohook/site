import { toCamelCase } from "../../json/helpers/toCamelCase"
import { Webhook } from "../types/Webhook"

export const fetchWebhookInfo = async (
  url: string,
): Promise<Webhook | undefined> => {
  const response = await fetch(url)

  if (response.status !== 200) return

  const json = JSON.parse(await response.text())
  if (typeof json === "object" && json !== null) {
    return toCamelCase(json) as Webhook
  }
}
