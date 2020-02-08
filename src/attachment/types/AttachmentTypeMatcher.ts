import { AttachmentType } from "./AttachmentType"

export type AttachmentTypeMatcher = {
  check: "mime" | "name"
  regex: RegExp
  type: AttachmentType
}
