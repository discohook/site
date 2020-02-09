import { DISCORD_AVATARS_CDN_BASE_URL } from "../constants"
import { Webhook } from "../types/Webhook"

export const getAvatarUrl = (webhook: Webhook) =>
  `${DISCORD_AVATARS_CDN_BASE_URL}/${webhook.id}/${webhook.avatar}.png`
