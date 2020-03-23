import React from "react"
import { defaultRules } from "simple-markdown"
import { Emoji } from "../components/Emoji"
import { PLAINTEXT_EMOJIS } from "../constants/constants"
import { NAME_TO_EMOJI } from "../constants/emojiMaps"
import { getEmojiUrl } from "../helpers/getEmojiUrl"
import type { MarkdownRule } from "../types/MarkdownRule"

const EMOJI_NAME_RE = /^:([^\s:]+?(?:::skin-tone-\d)?):/

export const emoji: MarkdownRule = {
  ...defaultRules.text,
  match: content => {
    const match = EMOJI_NAME_RE.exec(content)
    if (!match) return null

    const [, name] = match

    if (NAME_TO_EMOJI.get(name)) {
      return match
    }

    return null
  },
  parse: capture => {
    const [content, name] = capture

    const emoji = NAME_TO_EMOJI.get(name)

    if (!emoji || PLAINTEXT_EMOJIS.includes(emoji)) {
      return {
        type: "text",
        content,
      }
    }

    const url = getEmojiUrl(emoji)

    return {
      name,
      emoji,
      src: url,
    }
  },
  react: (node, _, state) => (
    <Emoji
      key={state.key}
      src={node.src}
      alt={node.emoji}
      title={node.name}
      draggable={false}
      big={node.jumboable}
    />
  ),
}
