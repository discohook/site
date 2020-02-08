import { parseEmbedContent } from "../parsers/parseEmbedContent"
import { parseEmbedHeader } from "../parsers/parseEmbedHeader"
import { parseMessageContent } from "../parsers/parseMessageContent"

export const PARSERS = {
  "message-content": parseMessageContent,
  "embed-content": parseEmbedContent,
  "embed-header": parseEmbedHeader,
}
