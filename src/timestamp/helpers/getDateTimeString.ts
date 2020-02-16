import {
  getDate,
  getHours,
  getMinutes,
  getMonth,
  getYear,
  isValid,
} from "date-fns"

export const getDateTimeString = (date: Date) => {
  if (!isValid(date)) {
    return undefined
  }

  const day = [
    getYear(date),
    String(getMonth(date) + 1).padStart(2, "0"),
    String(getDate(date)).padStart(2, "0"),
  ].join("-")
  const time = [
    String(getHours(date)).padStart(2, "0"),
    String(getMinutes(date)).padStart(2, "0"),
  ].join(":")

  return `${day} ${time}`
}
