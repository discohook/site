import { ASTNode, SingleASTNode } from "simple-markdown"

const isEmoji = (node: SingleASTNode) => /^(emoji|customEmoji)$/.test(node.type)

export const jumbosizeEmojis = (ast: ASTNode): ASTNode => {
  if (!Array.isArray(ast)) {
    const node = { ...ast }
    if (isEmoji(node)) node.jumboable = true
    return node
  }

  // Gets all nodes of type 'emoji' or 'customEmoji'
  const emojiNodes = ast.filter(node => isEmoji(node))
  // If there's more than 27 (limit of jumbosized emojis), return the tree as is
  if (emojiNodes.length > 27) return ast

  // Check if the tree has any amount of nodes that aren't emojis,
  // or nodes containing whitespace only
  const hasText = ast.some(node => {
    if (isEmoji(node)) return false
    if (node.type === "br") return false
    if (typeof node.content !== "string") return true
    if (node.content.trim() !== "") return true
    return false
  })
  if (hasText) return ast

  // If the message passed all checks, return a copy of the tree where all nodes
  // have the 'jumboable' property set to true
  return ast.map(node => (isEmoji(node) ? { ...node, jumboable: true } : node))
}
