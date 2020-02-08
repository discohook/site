import { produce } from "immer"
import { SingleASTNode } from "simple-markdown"

export const jumbosizeEmojis = (ast: SingleASTNode[]): SingleASTNode[] => {
  // Gets all nodes of type 'emoji' or 'customEmoji'
  const emojiNodes = ast.filter(node => node.type === "emoji")
  // If there's more than 27 (limit of jumbosized emojis), return the tree as is
  if (emojiNodes.length > 27) return ast

  // Check if the tree has any amount of nodes that aren't emojis,
  // or nodes containing whitespace only
  const hasText = ast.some(node => {
    if (node.type === "emoji") return false
    if (node.type === "br") return false
    if (typeof node.content !== "string") return true
    if (node.content.trim() !== "") return true
    return false
  })
  if (hasText) return ast

  // If the message passed all checks, return a copy of the tree where all nodes
  // have the 'jumboable' property set to true
  return produce(ast, ast => {
    for (const node of ast) {
      if (node.type === "emoji") {
        node.jumboable = true
      }
    }
  })
}
