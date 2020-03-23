import type { Field } from "../classes/Field"
import { FIELD_GRID_SIZE, MAX_FIELDS_PER_ROW } from "../constants"

export const getFieldWidth = (field: Field) => {
  if (!field.inline) return `1 / ${FIELD_GRID_SIZE + 1}`

  const fieldIndex = field.embed.fields.indexOf(field)

  let startingField = fieldIndex
  while (startingField > 0 && field.embed.fields[startingField - 1].inline) {
    startingField -= 1
  }

  let totalInlineFields = 0
  while (
    field.embed.fields.length > startingField + totalInlineFields &&
    field.embed.fields[startingField + totalInlineFields].inline
  ) {
    totalInlineFields += 1
  }

  const indexInSequence = fieldIndex - startingField
  const currentRow = indexInSequence / MAX_FIELDS_PER_ROW
  const indexOnRow = indexInSequence % MAX_FIELDS_PER_ROW
  const totalOnLastRow =
    totalInlineFields % MAX_FIELDS_PER_ROW || MAX_FIELDS_PER_ROW
  const fullRows = (totalInlineFields - totalOnLastRow) / MAX_FIELDS_PER_ROW
  const totalOnRow =
    currentRow >= fullRows ? totalOnLastRow : MAX_FIELDS_PER_ROW

  const columnSpan = FIELD_GRID_SIZE / totalOnRow
  const start = indexOnRow * columnSpan + 1
  const end = start + columnSpan

  return `${start} / ${end}`
}
