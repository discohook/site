import { Field } from "../message/Message"

type FieldWithWidth = Field & { width: string }

export const getFieldsWithWidths = (fields: Field[]) => {
  const fieldsWithWidths: FieldWithWidth[] = fields.map(field => ({
    ...field,
    width: "1 / 13",
  }))

  let inlineFieldCount = 0

  for (const [index, field] of fields.entries()) {
    if (!field.inline) {
      inlineFieldCount = 0
      continue
    }

    inlineFieldCount += 1

    switch (inlineFieldCount) {
      case 1: {
        break
      }
      case 2: {
        fieldsWithWidths[index - 1].width = "1 / 7"
        fieldsWithWidths[index].width = "7 / 13"

        break
      }
      case 3: {
        fieldsWithWidths[index - 2].width = "1 / 5"
        fieldsWithWidths[index - 1].width = "5 / 9"
        fieldsWithWidths[index].width = "9 / 13"

        inlineFieldCount = 0

        break
      }
    }
  }

  return fieldsWithWidths
}
