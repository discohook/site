export const joinWithAnd = (parts: string[]): string => {
  if (parts.length === 1) return parts[0]
  const firsts = parts.slice(0, parts.length - 1)
  const last = parts[parts.length - 1]
  return `${firsts.join(", ")}${parts.length > 2 ? "," : ""} and ${last}`
}
