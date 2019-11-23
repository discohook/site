const host = /(?:www\.|ptb\.|canary\.)discordapp\.com/
const id = /\d+/
const token = /[\w-]+/

export const webhookUrlRegex = new RegExp(
  `https?://${host.source}/api/webhooks/${id.source}/${token.source}`,
)
