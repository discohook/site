import React from "react"
import {
  anyScopeRegex,
  ASTNode,
  defaultRules,
  inlineRegex,
  NodeOutput,
  outputFor,
  parserFor,
  ParserRule,
} from "simple-markdown"
import CodeBlock from "./CodeBlock"
import { emojiToName, getEmojiUrl, nameToEmoji } from "./emoji"

type Rules = Record<string, ParserRule & { react?: NodeOutput<any> | null }>

const escape = (s: string) =>
  s.replace(/[\-\[\]\/\{}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")

const emojiRegex = new RegExp(
  `(?:${Object.keys(emojiToName)
    .sort((emoji) => -emoji.length)
    .map(escape)
    .join("|")})`,
  "g",
)

const baseRules: Rules = {
  escape: defaultRules.escape,
  link: defaultRules.link,
  autolink: {
    ...defaultRules.autolink,
    match: anyScopeRegex(/^<(https?:\/\/[^ >]+)>/),
  },
  url: defaultRules.url,
  strong: defaultRules.strong,
  em: defaultRules.em,
  u: defaultRules.u,
  inlineCode: defaultRules.inlineCode,
  shrug: {
    // Exception for left arm disappearing because of the underscore getting
    // escaped, and the right arm being a part of an italic node.
    order: defaultRules.text.order,
    match: (source) => /^(¯\\_\(ツ\)_\/¯)/.exec(source),
    parse: (capture) => ({ type: "text", content: capture[1] }),
  },
  emoji: {
    order: defaultRules.text.order,
    match: anyScopeRegex(/^:([^\s:]+?(?:::skin\-tone\-\d)?):/),
    parse: (capture) =>
      nameToEmoji[capture[1]]
        ? {
            name: `:${capture[1]}:`,
            surrogate: nameToEmoji[capture[1]],
            src: getEmojiUrl(nameToEmoji[capture[1]]),
          }
        : {
            type: "text",
            content: capture[0],
          },
    react: (node, _, state) =>
      node.src ? (
        <img
          draggable={false}
          className={`emoji ${node.jumboable ? "jumboable" : ""}`.trim()}
          alt={node.surrogate}
          title={node.name}
          src={node.src}
          key={state.key}
        />
      ) : (
        <span key={state.key}>{node.surrogate}</span>
      ),
  },
  customEmoji: {
    order: defaultRules.text.order,
    match: anyScopeRegex(/^<(a?):(\w+):(\d+)>/),
    parse: (capture) => ({
      id: capture[3],
      name: `${capture[2]}`,
      src: `https://cdn.discordapp.com/emojis/${capture[3]}`,
      animated: !!capture[1],
    }),
    react: (node, _, state) => (
      <img
        draggable={false}
        className={`emoji ${node.jumboable ? "jumboable" : ""}`.trim()}
        alt={node.name}
        title={node.name}
        src={node.src}
        key={state.key}
      />
    ),
  },
  text: {
    ...defaultRules.text,
    parse: (capture, parse, state) =>
      state.nested
        ? { content: capture[0] }
        : parse(
            capture[0].replace(
              emojiRegex,
              (match) => `:${emojiToName[match]}:`,
            ),
            { ...state, nested: true },
          ),
  },
  del: {
    ...defaultRules.del,
    match: inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
  },
  mention: {
    order: defaultRules.text.order,
    match: inlineRegex(/^<@!?\d+>|^@(everyone|here)/),
    parse: (capture) =>
      capture[1] ? { content: `@${capture[1]}` } : { content: "@unknown-user" },
    react: (node, _, state) => (
      <span className="mention" key={state.key}>
        {node.content}
      </span>
    ),
  },
  roleMention: {
    order: defaultRules.text.order,
    match: inlineRegex(/^<@&\d+>/),
    parse: () => ({ type: "mention", content: "@unknown-role" }),
  },
  channelMention: {
    order: defaultRules.text.order,
    match: inlineRegex(/^<#\d+>/),
    parse: () => ({ type: "mention", content: "#unknown-channel" }),
  },
  spoiler: {
    order: defaultRules.text.order,
    match: inlineRegex(/^\|\|([\s\S]+?)\|\|/),
    parse: (capture, parse, state) => ({ content: parse(capture[1], state) }),
    react: (node, output, state) => (
      <span className="spoiler" key={state.key}>
        {output(node.content, state)}
      </span>
    ),
  },
}

const inlineRules: Rules = { ...baseRules }

const blockRules: Rules = {
  ...baseRules,
  newline: defaultRules.newline,
  paragraph: defaultRules.paragraph,
  br: {
    ...defaultRules.br,
    match: anyScopeRegex(/^ *\n/),
  },
  codeBlock: {
    order: defaultRules.codeBlock.order,
    match: anyScopeRegex(/^```([a-z0-9\-]+?\n+)?\n*([^]+?)\n*```/),
    parse: (capture) => ({
      language: (capture[1] || "").trim(),
      content: capture[2] || "",
    }),
    react: (node, _, state) => (
      <CodeBlock
        key={state.key}
        language={node.language}
        content={node.content}
      />
    ),
  },
}

const parseInline = parserFor(inlineRules, { inline: true })
const parseBlock = parserFor(blockRules, { inline: true })
const reactOutput = outputFor({ ...inlineRules, ...blockRules }, "react")

export const jumbo = (ast: ASTNode): ASTNode => {
  if (!Array.isArray(ast))
    return { ...ast, jumboable: ["emoji", "customEmoji"].includes(ast.type) }

  // Gets all nodes of type 'emoji' or 'customEmoji'
  const emojiNodes = ast.filter(
    (node) => !["emoji", "customEmoji"].includes(node.type),
  )
  // If there's more than 26 (limit of jumbosized emojis), return the tree as is
  if (emojiNodes.length >= 26) return ast

  // Check if the tree has any amount of nodes that aren't emojis,
  // or nodes containing whitespace only
  const hasText = ast.some(
    (node) =>
      !["emoji", "customEmoji"].includes(node.type) &&
      (typeof node.content !== "string" || node.content.trim() !== ""),
  )
  if (hasText) return ast

  // If the message passed all checks, return a copy of the tree where all nodes
  // have the 'jumboable' property set to true
  return ast.map((node) => ({ ...node, jumboable: true }))
}

const ellipsize = (text: string, length: number) => {
  const short = text.replace(/[\s]+/g, " ")
  return short.length <= length ? short : short.substring(0, length) + "…"
}

export const parseMarkup = (content: string, inline: boolean = false) => {
  const startTime = performance.now()

  const ast = inline ? parseInline(content) : jumbo(parseBlock(content))
  const parseTime = performance.now() - startTime

  const output = reactOutput(ast)
  const outputTime = performance.now() - startTime - parseTime

  const totalTime = parseTime + outputTime

  if (totalTime > 1) {
    const ellipsized = ellipsize(content, 8)
    const time = totalTime.toFixed(3)
    console.log(`Rendered markup for "${ellipsized}" in ${time}ms:`, {
      tree: ast,
      options: { content, inline },
      timing: { parseTime, outputTime },
    })
  }

  return output
}
