import { getDate, getMonth, getYear, isValid } from "date-fns"

const ONE_DAY = 1000 * 60 * 60 * 24

const getTimestampFormat = (date: Date, base?: Date) => {
  const givenDate = new Date(date).setHours(0, 0, 0, 0)
  const now = new Date(base ?? Date.now()).setHours(0, 0, 0, 0)

  const difference = (givenDate - now) / ONE_DAY

  if (difference < -1) return "full"
  if (difference < 0) return "yesterday"
  if (difference < 1) return "today"
  if (difference < 2) return "tomorrow"
  return "full"
}

export const formatTimestamp = (date: Date, base?: Date) => {
  if (!isValid(date)) return "Invalid date"

  const day = String(getDate(date)).padStart(2, "0")
  const month = String(getMonth(date) + 1).padStart(2, "0")
  const year = getYear(date)

  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "numeric",
    hour12: true,
  })

  switch (getTimestampFormat(date, base)) {
    case "yesterday": {
      return `Yesterday at ${time}`
    }
    case "today": {
      return `Today at ${time}`
    }
    case "tomorrow": {
      return `Tomorrow at ${time}`
    }
    default: {
      return `${day}/${month}/${year}`
    }
  }
}
