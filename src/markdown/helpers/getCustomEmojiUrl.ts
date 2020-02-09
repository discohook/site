import {
  CUSTOM_EMOJI_CDN_BASE_URL,
  DISCOHOOK_EMOJI_ID,
  DISCOHOOK_EMOJI_URL,
} from "../constants/constants"

export const getCustomEmojiUrl = (id: string) => {
  if (id === DISCOHOOK_EMOJI_ID) return DISCOHOOK_EMOJI_URL

  // While v=1 isn't necessary, it is used anyway to decrease load times.
  // The user may have loaded this emoji from the browser app, which uses the
  // same query parameter.
  return `${CUSTOM_EMOJI_CDN_BASE_URL}/${id}?v=1`
}
