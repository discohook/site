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
