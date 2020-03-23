import { ATTACHMENT_TYPE_MATCHERS } from "../constants"
import type { AttachmentType } from "../types/AttachmentType"

export const getAttachmentType = (
  name: string,
  mime: string,
): AttachmentType => {
  for (const descriptor of ATTACHMENT_TYPE_MATCHERS) {
    const regex = new RegExp(descriptor.regex)
    if (regex.test(descriptor.check === "name" ? name : mime)) {
      return descriptor.type
    }
  }

  return "unknown"
}
