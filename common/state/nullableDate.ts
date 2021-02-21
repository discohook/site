import { types } from "mobx-state-tree"

export const nullableDate = types.custom<Date | number | null, Date>({
  name: "NullableDate",
  fromSnapshot(value) {
    return new Date(value ?? Number.NaN)
  },
  toSnapshot(value) {
    const time = value.getTime()
    return Number.isNaN(time) ? null : time
  },
  isTargetType(value) {
    return value instanceof Date
  },
  getValidationMessage(value: unknown) {
    if (value instanceof Date) return ""
    if (typeof value === "number") return ""
    if (value === null) return ""

    return "Value is not a Date, a unix milliseconds timestamp, or null"
  },
})
