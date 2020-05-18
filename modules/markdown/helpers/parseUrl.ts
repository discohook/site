import type { ParseFunction } from "simple-markdown"
import { depunycodeUrl } from "./depunycodeUrl"

export const parseUrl: ParseFunction = capture => {
  const [, content] = capture

  const url = depunycodeUrl(content)

  if (!url) {
    return {
      type: "text",
      content,
    }
  }

  return {
    content: [{ type: "text", content: url }],
    target: url,
  }
}
