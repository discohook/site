import { AttachmentIconType, attachmentTypes } from "./attachmentTypes"

export const getAttachmentType = (
  name: string,
  mime: string,
): AttachmentIconType => {
  const types = attachmentTypes

  for (const type of types) {
    const regex = new RegExp(type.regex)
    if (regex.test(type.check === "name" ? name : mime)) {
      return type.icon
    }
  }

  return "unknown"
}
