import React, { ReactElement, ReactNode } from "react"
import {
  anyScopeRegex,
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
          className={`emoji ${node.jumboable ? "jumboable" : ""}`}
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
    match: anyScopeRegex(/^<:(\w+):(\d+)>/),
    parse: (capture) => ({
      name: `:${capture[1]}:`,
      src: `https://cdn.discordapp.com/emojis/${capture[2]}`,
    }),
    react: (node: SingleASTNode, output: Output<any>, state: State) => (
      <img
        draggable={false}
        className={`emoji ${node.jumboable ? "jumboable" : ""}`}
        alt={`<:${node.name}:${node.id}>`}
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

export const parseMarkup = (content: string, inline?: boolean) => {
  console.time("render markup")
  const ast = inline ? parseInline(content) : parseBlock(content)
  console.timeLog("render markup", "parsed markup", { ast })
  const output = reactOutput(ast)
  console.timeEnd("render markup")
  return output
}
