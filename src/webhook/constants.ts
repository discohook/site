export const DISCORD_AVATARS_CDN_BASE_URL = "https://cdn.discordapp.com/avatars"

export const DEFAULT_AVATAR_URL =
  "https://discohook.org/assets/discord-avatar.png"
export const DEFAULT_DISPLAY_NAME = "Discohook"

export const DISCORD_HOST_RE = /(?:www\.|ptb\.|canary\.)?discordapp\.com/
export const WEBHOOK_ID_RE = /\d+/
export const WEBHOOK_TOKEN_RE = /[\w-]+/
export const WEBHOOK_URL_RE = new RegExp(
  [
    "^",
    "https?://",
    DISCORD_HOST_RE.source,
    "/api/webhooks/",
    WEBHOOK_ID_RE.source,
    "/",
    WEBHOOK_TOKEN_RE.source,
    "$",
  ].join(""),
)
