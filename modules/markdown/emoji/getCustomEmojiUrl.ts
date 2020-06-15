const CUSTOM_EMOJI_CDN_BASE_URL = "https://cdn.discordapp.com/emojis"

const EXCEPTIONS = new Map(
  Object.entries({
    "694285995394203759": "https://discohook.org/static/discohook-emoji.png",
  }),
)

export const getCustomEmojiUrl = (id: string) => {
  if (EXCEPTIONS.has(id)) return EXCEPTIONS.get(id)

  // While v=1 isn't necessary, it is used anyway to decrease load times.
  // The user may have loaded this emoji from the browser app, which uses the
  // same query parameter.
  return `${CUSTOM_EMOJI_CDN_BASE_URL}/${id}?v=1`
}
