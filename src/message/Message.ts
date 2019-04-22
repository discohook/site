import { Embed } from "./embed/Embed"

export interface Message {
  content?: string
  username?: string
  avatarUrl?: string
  embeds?: Embed[]
}
