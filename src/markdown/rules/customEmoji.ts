import { defaultRules, inlineRegex } from "simple-markdown"
import { MarkdownRule } from "../types/MarkdownRule"

const CUSTOM_EMOJI_RE = /^<a?:(\w+):(\d+)>/

export const customEmoji: MarkdownRule = {
  ...defaultRules.text,
  match: inlineRegex(CUSTOM_EMOJI_RE),
  parse: capture => {
    const [, name, id] = capture

    return {
      type: "emoji",
      name,
      emoji: name,
      src:
        id === "645409602393079819"
          ? "https://discohook.jaylineko.com/assets/discohook-emoji.png"
          : `https://cdn.discordapp.com/emojis/${id}?v=1`,
    }
  },
}
