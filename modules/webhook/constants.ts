export const DISCORD_API_BASE_URLS = [
  "https://discord.com/api/v8",
  "https://ptb.discord.com/api/v8",
  "https://canary.discord.com/api/v8",
]

const getDiscordApiHost = async () => {
  let firstError

  for (const url of DISCORD_API_BASE_URLS) {
    try {
      // eslint-disable-next-line no-await-in-loop
      await fetch(url)
      return new URL(url).host
    } catch (error) {
      firstError = error
    }
  }

  throw firstError
}

export const DISCORD_API_HOST_PROMISE = new Promise<string>(
  (resolve, reject) => {
    getDiscordApiHost().then(resolve).catch(reject)
  },
)

export const DISCORD_AVATARS_CDN_BASE_URL = "https://cdn.discordapp.com/avatars"

export const DEFAULT_AVATAR_URL =
  "https://cdn.discordapp.com/embed/avatars/0.png"
export const BRANDED_DEFAULT_AVATAR_URL = "/static/discord-avatar.png"
export const DEFAULT_DISPLAY_NAME = "Discohook"

export const WEBHOOK_URL_RE = /^https?:\/\/(?:www\.|ptb\.|canary\.)?discord(?:app)?\.com\/api(?:\/v\d+)?\/webhooks\/\d+\/[\w-]+$/

export const MESSAGE_REF_RE = /^(?:https:\/\/(?:www\.|ptb\.|canary\.)?discord(?:app)?\.com\/channels\/\d+\/\d+\/)?(\d+)$/
