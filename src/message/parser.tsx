import React, { ReactElement, ReactNode } from "react"
import {
  anyScopeRegex,
  blockRegex,
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
import { emojiToName, getEmojiUrl, nameToEmoji } from "../helpers/emoji"

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

const rules: Rules = {
  newline: defaultRules.newline,
  paragraph: defaultRules.paragraph,
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
  br: {
    ...defaultRules.br,
    match: anyScopeRegex(/^ *\n/),
  },
  inlineCode: defaultRules.inlineCode,
  emoticon: {
    order: defaultRules.text.order,
    match: (source) => /^(¯\\_\(ツ\)_\/¯)/.exec(source),
    parse: (capture) => ({ type: "text", content: capture[1] }),
  },
  codeBlock: {
    order: defaultRules.codeBlock.order,
    match: blockRegex(/^```(([a-z0-9\-]+?)\n+)?\n*([^]+?)\n*```/),
    parse: (capture) => ({
      lang: (capture[2] || "").trim(),
      content: capture[3] || "",
    }),
    react: (node: SingleASTNode, output: Output<any>, state: State) => (
      <pre key={state.key}>{node.content}</pre>
    ),
  },
  emoji: {
    order: defaultRules.text.order,
    match: anyScopeRegex(/^:([^\s:]+?(?:::skin\-tone\-\d)?):/),
    parse: (capture) =>
      nameToEmoji[capture[1]]
        ? {
            name: `:${name}:`,
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
      emojiId: capture[2],
      name: capture[1],
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
    parse: (capture, recurseParse, state) =>
      state.nested
        ? { content: capture[0] }
        : recurseParse(
            capture[0].replace(
              emojiRegex,
              (match) => `:${emojiToName[match[0]]}:`,
            ),
            { ...state, nested: true },
          ),
  },
  del: {
    ...defaultRules.del,
    match: inlineRegex(/^~~([\s\S]+?)~~(?!_)/),
  },
}

const parseMarkup = parserFor(rules)
const inlineOutput = outputFor(rules, "react", { inline: true })
const blockOutput = outputFor(rules, "react", { inline: false })

export const parse = (content: string, inline?: boolean) => {
  console.time("render markup")
  const ast = parseMarkup(content)
  console.timeLog("render markup", "parsed markup", { ast })
  const output = inline ? inlineOutput(ast) : blockOutput(ast)
  console.timeEnd("render markup")
  return output
}
