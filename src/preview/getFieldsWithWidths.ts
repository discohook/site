import { Draft, produce } from "immer"
import { Field } from "../message/Message"

type FieldWithWidth = Field & { readonly width: string }

export const getFieldsWithWidths = (
  fields: readonly Field[],
): readonly FieldWithWidth[] =>
  produce(fields, (fields: Draft<FieldWithWidth[]>) => {
    let inlineFieldCount = 0

    for (const [index, field] of fields.entries()) {
      if (!field.inline) {
        field.width = "1 / 13"
        inlineFieldCount = 0
        continue
      }

      inlineFieldCount += 1

      switch (inlineFieldCount) {
        case 1: {
          field.width = "1 / 13"
          break
        }
        case 2: {
          fields[index - 1].width = "1 / 7"
          field.width = "7 / 13"
          break
        }
        case 3: {
          inlineFieldCount = 0

          fields[index - 2].width = "1 / 5"
          fields[index - 1].width = "5 / 9"
          field.width = "9 / 13"
          break
        }
      }
    }

    return fields
  })
