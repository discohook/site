const CUSTOM_EMOJI_CDN_BASE_URL = "https://cdn.discordapp.com/emojis"

const EXCEPTIONS = new Map(
  Object.entries({
    "736648398081622016": "/static/discohook-emoji.png",
  }),
)

export const getCustomEmojiUrl = (id: string, animated?: boolean) => {
  if (EXCEPTIONS.has(id)) return EXCEPTIONS.get(id)

  // While v=1 isn't necessary, it is used anyway to decrease load times.
  // The user may have loaded this emoji from the browser app, which uses the
  // same query parameter.
  return `${CUSTOM_EMOJI_CDN_BASE_URL}/${id}.${animated ? "gif" : "png"}?v=1`
}
