import { addMilliseconds, subMilliseconds } from "date-fns/fp"

export const timezoneOffset = new Date().getTimezoneOffset() * 60000

export const addTimezoneOffset = addMilliseconds(timezoneOffset)
export const subTimezoneOffset = subMilliseconds(timezoneOffset)
