import { createParser } from "../helpers/createParser"
import { autolink } from "../rules/autolink"
import { blockQuote } from "../rules/blockQuote"
import { customEmoji } from "../rules/customEmoji"
import { emoji } from "../rules/emoji"
import { emote } from "../rules/emote"
import { emphasis } from "../rules/emphasis"
import { escape } from "../rules/escape"
import { inlineCode } from "../rules/inlineCode"
import { spoiler } from "../rules/spoiler"
import { strikethrough } from "../rules/strikethrough"
import { strong } from "../rules/strong"
import { text } from "../rules/text"
import { underline } from "../rules/underline"
import { url } from "../rules/url"

export const parseEmbedHeader = createParser({
  autolink,
  blockQuote,
  customEmoji,
  emoji,
  emote,
  emphasis,
  escape,
  inlineCode,
  spoiler,
  strikethrough,
  strong,
  text,
  underline,
  url,
})
