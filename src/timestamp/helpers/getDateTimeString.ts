import { isValid } from "date-fns"
import { subTimezoneOffset } from "./subTimezoneOffset"

export const getDateTimeString = (iso: string | undefined) => {
  const date = new Date(iso ?? NaN)

  if (!isValid(date)) {
    return undefined
  }

  return subTimezoneOffset(date)
    .toISOString()
    .replace("T", " ")
    .slice(0, -8)
}
