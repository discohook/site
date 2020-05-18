export type JsonType =
  | string
  | number
  | boolean
  | null
  | { [key: string]: JsonType | undefined }
  | JsonType[]
