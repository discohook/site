import { Webhook } from "../types/Webhook"

export const getAvatarUrl = (webhook: Webhook) =>
  `https://cdn.discordapp.com/avatars/${webhook.id}/${webhook.avatar}.png`
