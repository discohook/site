// Flag reference:
// + = include ::skin-tone-x
// # = include _tonex
// ! = include _x_skin_tone
// * = skip alias as global

export type Emoji = {
  emoji: string
  flags?: string
  aliases: {
    name: string
    flags?: string
  }[]
}
