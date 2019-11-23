import { Webhook } from "./Webhook"

export const getAvatarUrl = (webhook: Webhook) =>
  `https://cdn.discordapp.com/avatars/${webhook.id}/${webhook.avatar}.png`
