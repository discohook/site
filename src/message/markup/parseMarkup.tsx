import React, { ReactElement, ReactNode } from "react"
import {
  anyScopeRegex,
  ASTNode,
  defaultRules,
  inlineRegex,
  NodeOutput,
  Output,
  outputFor,
  parserFor,
  ParserRule,
  SingleASTNode,
  State,
} from "simple-markdown"
import { emojiToName, getEmojiUrl, nameToEmoji } from "./emoji"
import { highlightCode } from "./highlightCode"

type Rules = Record<
  string,
  ParserRule & {
    react?:
      | NodeOutput<ReactElement>
      | NodeOutput<ReactNode>
      | NodeOutput<string>
      | null
  }
>

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
  emoticon: {
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
    react: (node: SingleASTNode, output: Output<any>, state: State) =>
      node.src ? (
        <img
          draggable={false}
          className={`emoji${node.jumboable ? " jumboable" : ""}`}
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
    react: (node: SingleASTNode, output: Output<any>, state: State) => (
      <img
        draggable={false}
        className={`emoji${node.jumboable ? " jumboable" : ""}`}
        alt={`<${node.animated ? "a" : ""}${node.name}${node.id}>`}
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
    react: (node: SingleASTNode, output: Output<any>, state: State) => (
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
    react: (node: SingleASTNode, output: Output<any>, state: State) => (
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
    react: (node: SingleASTNode, output: Output<any>, state: State) =>
      highlightCode(node.language, node.content, state.key),
  },
}

const parseInline = parserFor(inlineRules, { inline: true })
const parseBlock = parserFor(blockRules, { inline: true })
const reactOutput = outputFor({ ...inlineRules, ...blockRules }, "react")

export const jumbo = (ast: ASTNode): ASTNode => {
  if (!Array.isArray(ast)) {
    const node = { ...ast }
    if (["emoji", "customEmoji"].includes(ast.type)) node.jumboable = true
    return node
  }

  const tree = Array.from(ast)

  const emojiNodes = tree.filter(
    (node) => !["emoji", "customEmoji"].includes(node.type),
  )

  const hasText = tree.some(
    (node) =>
      !["emoji", "customEmoji"].includes(node.type) &&
      (typeof node.content !== "string" || node.content.trim() !== ""),
  )

  if (emojiNodes.length > 27 || hasText) return tree

  for (const node of tree) node.jumboable = true
  return tree
}

export const parseMarkup = (content: string, inline?: boolean) => {
  console.time("render markup")
  const ast = inline ? parseInline(content) : jumbo(parseBlock(content))
  console.timeLog("render markup", "parsed markup", { ast })
  const output = reactOutput(ast)
  console.timeEnd("render markup")
  return output
}
