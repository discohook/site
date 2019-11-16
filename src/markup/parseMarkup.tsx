/* eslint-disable react/display-name, react/no-multi-comp, unicorn/no-unsafe-regex */

import React from "react"
import {
  anyScopeRegex,
  defaultRules,
  inlineRegex,
  outputFor,
  parserFor,
  ParserRule,
  ReactOutputRule,
} from "simple-markdown"
import CodeBlock from "../code/CodeBlock"
import { emojiToName, getEmojiUrl, nameToEmoji } from "./emoji"
import { jumbosizeEmojis } from "./jumbosizeEmojis"
import {
  BlockQuoteContainer,
  BlockQuoteContent,
  BlockQuoteDivider,
  Code,
  Emoji,
  Mention,
  Spoiler,
} from "./styles"

type ReactRules = Record<string, ParserRule & ReactOutputRule>

const emojiRegex = new RegExp(
  Array.from(emojiToName.keys())
    .join("|")
    // Asterisk emoji starts with an asterisk and must be escaped
    .replace("*", "\\*"),
  "g",
)

const baseRules: ReactRules = {
  escape: defaultRules.escape,
  link: {
    ...defaultRules.link,
    react: (node, output, state) => (
      <a
        href={node.target}
        title={node.title}
        rel="noopener noreferrer nofollow ugc"
        target="_blank"
        key={state.key}
      >
        {output(node.content, state)}
      </a>
    ),
  },
  autolink: {
    ...defaultRules.autolink,
    match: anyScopeRegex(/^<(https?:\/\/[^ >]+)>/),
  },
  url: defaultRules.url,
  strong: defaultRules.strong,
  em: defaultRules.em,
  underline: defaultRules.u,
  inlineCode: {
    ...defaultRules.inlineCode,
    react: (node, _, state) => <Code key={state.key}>{node.content}</Code>,
  },
  shrug: {
    // Edge case for shrug emoji getting parsed as markup.
    order: defaultRules.text.order,
    match: inlineRegex(/^¯\\_\(ツ\)_\/¯/),
    parse: capture => ({
      type: "text",
      content: capture[0],
    }),
    react: null,
  },
  emoji: {
    order: defaultRules.text.order,
    match: inlineRegex(/^:([^\s:]+?(?:::skin-tone-\d)?):/),
    parse: capture =>
      nameToEmoji.get(capture[1])
        ? {
            name: capture[1],
            surrogate: nameToEmoji.get(capture[1]),
            src: getEmojiUrl(nameToEmoji.get(capture[1]) ?? ""),
          }
        : {
            type: "text",
            content: capture[0],
          },
    react: (node, _, state) =>
      node.src ? (
        <Emoji
          src={node.src}
          alt={node.surrogate}
          title={node.name}
          draggable={false}
          big={node.jumboable}
          key={state.key}
        />
      ) : (
        <span key={state.key}>{node.surrogate}</span>
      ),
  },
  customEmoji: {
    order: defaultRules.text.order,
    match: inlineRegex(/^<a?:(\w+):(\d+)>/),
    parse: capture => ({
      id: capture[2],
      name: `${capture[1]}`,
      src:
        capture[2] === "638012379925577748"
          ? "https://discohook.jaylineko.com/assets/discohook-emoji.png"
          : `https://cdn.discordapp.com/emojis/${capture[2]}?v=1`,
    }),
    react: (node, _, state) => (
      <Emoji
        src={node.src}
        alt={node.surrogate}
        title={node.name}
        draggable={false}
        big={node.jumboable}
        key={state.key}
      />
    ),
  },
  text: {
    ...defaultRules.text,
    parse: (capture, parse, state) =>
      state.nested
        ? {
            content: capture[0],
          }
        : parse(
            capture[0].replace(
              emojiRegex,
              emoji => `:${emojiToName.get(emoji)}:`,
            ),
            { ...state, nested: true },
          ),
  },
  del: {
    ...defaultRules.del,
    match: inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
  },
  spoiler: {
    order: defaultRules.text.order,
    match: inlineRegex(/^\|\|([\s\S]+?)\|\|/),
    parse: (capture, parse, state) => ({
      content: parse(capture[1], state),
    }),
    react: (node, output, state) => (
      <Spoiler key={state.key}>{output(node.content, state)}</Spoiler>
    ),
  },
  blockQuote: {
    ...defaultRules.blockQuote,
    match: (source, state, previous) =>
      !/^$|\n *$/.test(previous) || state.inQuote || state.nested
        ? null
        : /^( *>>> +([\s\S]*))|^( *>(?!>>) +[^\n]*(\n *>(?!>>) +[^\n]*)*\n?)/.exec(
            source,
          ),
    parse: (capture, parse, state) => {
      const multiline = /^ *>>> ?/.test(capture[0])
      const trimmedContent = capture[0].replace(
        multiline ? /^ *>>> ?/ : /^ *> ?/gm,
        "",
      )

      const nestedContent = parse(trimmedContent, {
        ...state,
        inQuote: true,
        inline: multiline ? state.inline : true,
      })

      if (nestedContent.length === 0) {
        nestedContent.push({
          type: "text",
          content: " ",
        })
      }

      return { content: nestedContent }
    },
    react: (node, output, state) => (
      <BlockQuoteContainer key={state.key}>
        <BlockQuoteDivider />
        <BlockQuoteContent>{output(node.content, state)}</BlockQuoteContent>
      </BlockQuoteContainer>
    ),
  },
}

const inlineRules: ReactRules = {
  ...baseRules,
}

const blockRules: ReactRules = {
  ...baseRules,
  newline: defaultRules.newline,
  paragraph: defaultRules.paragraph,
  codeBlock: {
    order: defaultRules.codeBlock.order,
    match: anyScopeRegex(/^```(?:([a-z0-9-]+?)\n+)?\n*([\s\S]+?)\n*```/i),
    parse: (capture, _, state) => ({
      language: capture[1]?.trim() ?? "",
      content: capture[2] ?? "",
      inQuote: state.inQuote,
    }),
    react: (node, _, state) => (
      <CodeBlock
        key={state.key}
        language={node.language}
        content={node.content}
      />
    ),
  },
  mention: {
    order: defaultRules.text.order,
    match: inlineRegex(/^<@!?\d+>|^@(everyone|here)/),
    parse: capture => ({
      content: capture[1] ? `@${capture[1]}` : "@unknown-user",
    }),
    react: (node, _, state) => (
      <Mention key={state.key}>{node.content}</Mention>
    ),
  },
  roleMention: {
    order: defaultRules.text.order,
    match: inlineRegex(/^<@&\d+>/),
    parse: () => ({
      type: "mention",
      content: "@unknown-role",
    }),
    react: null,
  },
  channelMention: {
    order: defaultRules.text.order,
    match: inlineRegex(/^<#\d+>/),
    parse: () => ({
      type: "mention",
      content: "#unknown-channel",
    }),
    react: null,
  },
}

const parseInline = parserFor(inlineRules, { inline: true })
const parseBlock = parserFor(blockRules, { inline: true })
const reactOutput = outputFor({ ...inlineRules, ...blockRules }, "react")

const ellipsize = (text: string, length: number) => {
  const shortenedText = text.replace(/\s+/g, " ")
  return shortenedText.length <= length
    ? shortenedText
    : `${shortenedText.slice(0, length)}…`
}

const now = () => globalThis.performance?.now?.() ?? 0

export const parseMarkup = (
  content: string,
  options?: { inline?: boolean; jumboable?: boolean },
) => {
  const { inline = false, jumboable = false } = options || {}

  const startTime = now()

  const raw = inline ? parseInline(content) : parseBlock(content)
  const ast = jumboable ? jumbosizeEmojis(raw) : raw
  const parseTime = now() - startTime

  const output = reactOutput(ast)
  const outputTime = now() - startTime - parseTime

  const totalTime = parseTime + outputTime

  if (totalTime > 1) {
    const ellipsized = ellipsize(content, 10)
    const time = totalTime.toLocaleString("en-US")

    console.groupCollapsed(`Parsed markup for "${ellipsized}" in ${time}ms`)
    console.log("AST:", ast)
    if (content.includes("\n")) {
      console.log("Content:", `\n${content}`)
    } else {
      console.log("Content:", content)
    }
    console.log("Inline:", inline)
    console.log("Parse time:", parseTime, "\nOutput time:", outputTime)
    console.groupEnd()
  }

  return output
}
