import { Embed } from "./embed/Embed"

export interface Message {
  content?: string
  embeds?: Embed[]
  username?: string
  avatarUrl?: string
}
