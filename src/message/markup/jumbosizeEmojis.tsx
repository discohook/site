import { ASTNode } from "simple-markdown"

export const jumbosizeEmojis = (ast: ASTNode[]): ASTNode[] => {
  const isEmoji = (node: ASTNode) => /emoji|customEmoji/.test(node.type)
  const isNotEmoji = (node: ASTNode) => !isEmoji(node)

  // Gets all nodes of type 'emoji' or 'customEmoji'
  const emojiNodes = ast.filter(isNotEmoji)
  // If there's more than 26 (limit of jumbosized emojis), return the tree as is
  if (emojiNodes.length >= 26) return ast

  // Check if the tree has any amount of nodes that aren't emojis,
  // or nodes containing whitespace only
  const hasText = ast.some(node => {
    if (isEmoji(node)) return false
    if (typeof node.content !== "string") return true
    if (node.content.trim() !== "") return true
    return false
  })
  if (hasText) return ast

  // If the message passed all checks, return a copy of the tree where all nodes
  // have the 'jumboable' property set to true
  return ast.map(node => ({
    ...node,
    jumboable: true,
  }))
}
