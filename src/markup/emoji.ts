import { emojiData, toneNames, toneNumbers, tones } from "./emojiData"

export const nameToEmoji = new Map<string, string>()
export const emojiToName = new Map<string, string>()

for (const { emoji, flags, aliases } of emojiData) {
  for (const alias of aliases) {
    if (!alias.flags?.includes("*")) {
      nameToEmoji.set(alias.name, emoji)
    }

    if (flags?.includes("+")) {
      for (const [id, diversity] of Object.entries(toneNumbers)) {
        nameToEmoji.set(
          `${alias.name}::skin-tone-${id}`,
          `${emoji}${diversity}`,
        )
      }
    }

    if (alias.flags?.includes("#")) {
      for (const [id, diversity] of Object.entries(toneNumbers)) {
        nameToEmoji.set(`${alias.name}_tone${id}`, `${emoji}${diversity}`)
      }
    }

    if (alias.flags?.includes("!")) {
      for (const [id, diversity] of Object.entries(toneNames)) {
        nameToEmoji.set(`${alias.name}_${id}_skin_tone`, `${emoji}${diversity}`)
      }
    }
  }

  emojiToName.set(emoji, aliases[0].name)

  if (flags?.includes("+")) {
    for (const [id, diversity] of Object.entries(toneNumbers)) {
      emojiToName.set(`${emoji}${diversity}`, `${aliases[0].name}_tone${id}`)
    }
  }
}

const zwidge = String.fromCodePoint(0x200d)

const male = "👨"
const female = "👩"
const neutral = "🧑"

const hands = "🤝"

for (const [toneA, idA, nameA] of tones) {
  const idSuffix = `_tone${idA}`
  const nameSuffix = `_${nameA}_skin_tone`
  const toneSuffix = `::skin-tone-${idA}`

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

  const people = neutral + toneA + zwidge + hands + zwidge + neutral + toneA
  const peopleName = "people_holding_hands"
  emojiToName.set(people, peopleName + idSuffix)
  nameToEmoji.set(peopleName + idSuffix, people)
  nameToEmoji.set(peopleName + nameSuffix, people)
  nameToEmoji.set(peopleName + toneSuffix, people)

  for (const [toneB, idB, nameB] of tones) {
    if (idA <= idB) continue

    const idSuffix = `_tone${idA}_tone${idB}`
    const nameSuffix = `_${nameA}_skin_tone_${nameB}_skin_tone`

    const womanAndMan = female + toneA + zwidge + hands + zwidge + male + toneB
    emojiToName.set(womanAndMan, womanAndManName + idSuffix)
    nameToEmoji.set(womanAndManName + idSuffix, womanAndMan)
    nameToEmoji.set(womanAndManName + nameSuffix, womanAndMan)

    const men = male + toneA + zwidge + hands + zwidge + male + toneB
    emojiToName.set(men, menName + idSuffix)
    nameToEmoji.set(menName + idSuffix, men)
    nameToEmoji.set(menName + nameSuffix, men)

    const women = female + toneA + zwidge + hands + zwidge + female + toneB
    emojiToName.set(women, womenName + idSuffix)
    nameToEmoji.set(womenName + idSuffix, women)
    nameToEmoji.set(womenName + nameSuffix, women)

    const people = neutral + toneA + zwidge + hands + zwidge + neutral + toneB
    emojiToName.set(people, peopleName + idSuffix)
    nameToEmoji.set(peopleName + idSuffix, people)
    nameToEmoji.set(peopleName + nameSuffix, people)
  }
}

console.log(emojiToName)

export const getEmojiUrl = (emoji: string) => {
  const file = [...emoji]
    .map(character => character.codePointAt(0)?.toString(16))
    // Twemoji does not include '\uFE0F' in their file names
    .filter(codePoint => codePoint !== "fe0f")
    .join("-")

  return `https://twemoji.maxcdn.com/v/12.1.3/svg/${file}.svg`
}
