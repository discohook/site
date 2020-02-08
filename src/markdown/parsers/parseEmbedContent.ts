import { createParser } from "../helpers/createParser"
import { autolink } from "../rules/autolink"
import { blockQuote } from "../rules/blockQuote"
import { codeBlock } from "../rules/codeBlock"
import { customEmoji } from "../rules/customEmoji"
import { emoji } from "../rules/emoji"
import { emote } from "../rules/emote"
import { emphasis } from "../rules/emphasis"
import { escape } from "../rules/escape"
import { inlineCode } from "../rules/inlineCode"
import { lineBreak } from "../rules/lineBreak"
import { link } from "../rules/link"
import { mention } from "../rules/mention"
import { newline } from "../rules/newline"
import { paragraph } from "../rules/paragraph"
import { spoiler } from "../rules/spoiler"
import { strikethrough } from "../rules/strikethrough"
import { strong } from "../rules/strong"
import { text } from "../rules/text"
import { underline } from "../rules/underline"
import { url } from "../rules/url"

export const parseEmbedContent = createParser({
  autolink,
  blockQuote,
  codeBlock,
  customEmoji,
  emoji,
  emote,
  emphasis,
  escape,
  inlineCode,
  lineBreak,
  link,
  mention,
  newline,
  paragraph,
  spoiler,
  strikethrough,
  strong,
  text,
  underline,
  url,
})
