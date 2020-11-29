export type JsonType =
  | string
  | number
  | boolean
  | null
  // eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
  | { [key: string]: JsonType | undefined }
  | JsonType[]
