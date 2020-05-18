import React from "react"
import { defaultRules } from "simple-markdown"
import { NAME_TO_EMOJI } from "../emoji/emoji"
import { getEmojiUrl } from "../emoji/getEmojiUrl"
import type { MarkdownRule } from "../parsers/MarkdownRule"
import { Emoji } from "../styles/Emoji"

const PLAINTEXT_EMOJIS = new Set(["™", "™️", "©", "©️", "®", "®️"])

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

    if (!emoji || PLAINTEXT_EMOJIS.has(emoji)) {
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
