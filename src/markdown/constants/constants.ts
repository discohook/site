export const MENTION_TYPES = {
  "@": "@unknown-user",
  "@!": "@unknown-user",
  "@&": "@unknown-role",
  "#": "#unknown-channel",
}

export const PLAINTEXT_EMOJIS = ["™", "™️", "©", "©️", "®", "®️"]

export const SKIN_TONES = [
  {
    unicode: "🏻",
    number: 1,
    name: "light",
  },
  {
    unicode: "🏼",
    number: 2,
    name: "medium_light",
  },
  {
    unicode: "🏽",
    number: 3,
    name: "medium",
  },
  {
    unicode: "🏾",
    number: 4,
    name: "medium_dark",
  },
  {
    unicode: "🏿",
    number: 5,
    name: "dark",
  },
]

export const TONE_NUMBERS = Object.fromEntries(
  SKIN_TONES.map(tone => [tone.number, tone.unicode]),
)

export const TONE_NAMES = Object.fromEntries(
  SKIN_TONES.map(tone => [tone.name, tone.unicode]),
)

export const EMOJI_CDN_BASE_URL = "https://twemoji.maxcdn.com/v/12.1.3/svg"
export const CUSTOM_EMOJI_CDN_BASE_URL = "https://cdn.discordapp.com/emojis"

export const DISCOHOOK_EMOJI_ID = "694285995394203759"
export const DISCOHOOK_EMOJI_URL =
  "https://discohook.org/assets/discohook-emoji.png"

// Matches string symbols instead of code points
// Regex extracted from lodash: https://github.com/lodash/lodash/blob/4.17.15/lodash.js#L261
// eslint-disable-next-line no-misleading-character-class
export const UNICODE_CHARACTER_RE = /\ud83c[\udffb-\udfff](?=\ud83c[\udffb-\udfff])|(?:[^\ud800-\udfff][\u0300-\u036f\u20d0-\u20ff\ufe20-\ufe2f]?|[\u0300-\u036f\u20d0-\u20ff\ufe20-\ufe2f]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\ud800-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\u20d0-\u20ff\ufe20-\ufe2f]|\ud83c[\udffb-\udfff])?(?:\u200d(?:[^\ud800-\udfff]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff])[\ufe0e\ufe0f]?(?:[\u0300-\u036f\u20d0-\u20ff\ufe20-\ufe2f]|\ud83c[\udffb-\udfff])?)*/g
