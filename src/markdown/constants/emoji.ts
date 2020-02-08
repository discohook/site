import { Emoji } from "../types/Emoji"
import { RAW_EMOJI_DATA } from "./rawEmojiData"

export const EMOJI: Emoji[] = RAW_EMOJI_DATA.split("\n").map(line => {
  const [emoji, ...names] = line.split(" ")

  return {
    emoji: emoji.split("/")[0],
    flags: emoji.split("/")[1],
    aliases: names.map(name => ({
      name: name.split("/")[0],
      flags: name.split("/")[1],
    })),
  }
})
