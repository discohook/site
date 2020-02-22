import { ParseFunction } from "simple-markdown"
import { depunycode } from "./depunycode"

export const parseLink: ParseFunction = capture => {
  const [, content] = capture

  const url = depunycode(content)

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
