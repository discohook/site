// >= v8
export type DiscordError = {
  code: number
  message: string
  errors?: Record<string, unknown>
}

export type CodedError = {
  code: string
  message: string
}
