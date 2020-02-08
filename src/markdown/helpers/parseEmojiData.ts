import { SKIN_TONES, TONE_NAMES, TONE_NUMBERS } from "../constants/constants"
import { EMOJI } from "../constants/emoji"

const ZWJ = String.fromCodePoint(0x200d)

const MAN = "👨"
const WOMAN = "👩"
const PERSON = "🧑"

const HANDSHAKE = "🤝"

export const parseEmojiData = () => {
  const emojiToName = new Map<string, string>()
  const nameToEmoji = new Map<string, string>()

  for (const { emoji, flags, aliases } of EMOJI) {
    emojiToName.set(emoji, aliases[0].name)

    if (flags?.includes("+")) {
      for (const [number, diversity] of Object.entries(TONE_NUMBERS)) {
        emojiToName.set(emoji + diversity, `${aliases[0].name}_tone${number}`)
      }
    }

    for (const alias of aliases) {
      if (!alias.flags?.includes("*")) {
        nameToEmoji.set(alias.name, emoji)
      }

      if (flags?.includes("+")) {
        for (const [number, diversity] of Object.entries(TONE_NUMBERS)) {
          nameToEmoji.set(
            `${alias.name}::skin-tone-${number}`,
            emoji + diversity,
          )
        }
      }

      if (alias.flags?.includes("#")) {
        for (const [id, diversity] of Object.entries(TONE_NUMBERS)) {
          nameToEmoji.set(`${alias.name}_tone${id}`, emoji + diversity)
        }
      }

      if (alias.flags?.includes("!")) {
        for (const [number, diversity] of Object.entries(TONE_NAMES)) {
          nameToEmoji.set(
            `${alias.name}_${number}_skin_tone`,
            emoji + diversity,
          )
        }
      }
    }
  }

  for (const { unicode: toneA, number: numberA, name: nameA } of SKIN_TONES) {
    const idSuffix = `_tone${numberA}`
    const nameSuffix = `_${nameA}_skin_tone`
    const toneSuffix = `::skin-tone-${numberA}`

    const womanAndMan = `👫${toneA}`
    const womanAndManName = "woman_and_man_holding_hands"

    emojiToName.set(womanAndMan, womanAndManName + idSuffix)
    nameToEmoji.set(womanAndManName + idSuffix, womanAndMan)
    nameToEmoji.set(womanAndManName + nameSuffix, womanAndMan)
    nameToEmoji.set(`couple${toneSuffix}`, womanAndMan)

    const men = `👬${toneA}`
    const menName = "men_holding_hands"
    emojiToName.set(men, menName + idSuffix)
    nameToEmoji.set(menName + idSuffix, men)
    nameToEmoji.set(menName + nameSuffix, men)
    nameToEmoji.set(`two_${menName}${toneSuffix}`, men)

    const women = `👭${toneA}`
    const womenName = "women_holding_hands"
    emojiToName.set(women, womenName + idSuffix)
    nameToEmoji.set(womenName + idSuffix, women)
    nameToEmoji.set(womenName + nameSuffix, women)
    nameToEmoji.set(`two_${womenName}${toneSuffix}`, women)

    const people = PERSON + toneA + ZWJ + HANDSHAKE + ZWJ + PERSON + toneA
    const peopleName = "people_holding_hands"
    emojiToName.set(people, peopleName + idSuffix)
    nameToEmoji.set(peopleName + idSuffix, people)
    nameToEmoji.set(peopleName + nameSuffix, people)
    nameToEmoji.set(peopleName + toneSuffix, people)

    for (const { unicode: toneB, number: numberB, name: nameB } of SKIN_TONES) {
      if (numberA <= numberB) continue

      const idSuffix = `_tone${numberA}_tone${numberB}`
      const nameSuffix = `_${nameA}_skin_tone_${nameB}_skin_tone`

      const womanAndMan = WOMAN + toneA + ZWJ + HANDSHAKE + ZWJ + MAN + toneB
      emojiToName.set(womanAndMan, womanAndManName + idSuffix)
      nameToEmoji.set(womanAndManName + idSuffix, womanAndMan)
      nameToEmoji.set(womanAndManName + nameSuffix, womanAndMan)

      const men = MAN + toneA + ZWJ + HANDSHAKE + ZWJ + MAN + toneB
      emojiToName.set(men, menName + idSuffix)
      nameToEmoji.set(menName + idSuffix, men)
      nameToEmoji.set(menName + nameSuffix, men)

      const women = WOMAN + toneA + ZWJ + HANDSHAKE + ZWJ + WOMAN + toneB
      emojiToName.set(women, womenName + idSuffix)
      nameToEmoji.set(womenName + idSuffix, women)
      nameToEmoji.set(womenName + nameSuffix, women)

      const people = PERSON + toneA + ZWJ + HANDSHAKE + ZWJ + PERSON + toneB
      emojiToName.set(people, peopleName + idSuffix)
      nameToEmoji.set(peopleName + idSuffix, people)
      nameToEmoji.set(peopleName + nameSuffix, people)
    }
  }

  return {
    nameToEmoji,
    emojiToName,
  }
}
