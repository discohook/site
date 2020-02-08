import { Embed } from "./Embed"

export type Message = {
  readonly content?: string
  readonly embeds?: readonly Embed[]
  readonly username?: string
  readonly avatarUrl?: string
}
