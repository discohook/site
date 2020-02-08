import { addMilliseconds } from "date-fns/fp"
import { TIMEZONE_OFFSET } from "../constants"

export const addTimezoneOffset = addMilliseconds(TIMEZONE_OFFSET)
