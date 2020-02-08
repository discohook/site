import { subMilliseconds } from "date-fns/fp"
import { TIMEZONE_OFFSET } from "../constants"

export const subTimezoneOffset = subMilliseconds(TIMEZONE_OFFSET)
