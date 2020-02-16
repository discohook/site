import { getDate, getMonth, getYear, isValid } from "date-fns"
import { getTimestampFormat } from "./getTimestampFormat"

export const formatTimestamp = (date: Date, base?: Date) => {
  if (!isValid(date)) return "Invalid date"

  const day = String(getDate(date)).padStart(2, "0")
  const month = String(getMonth(date) + 1).padStart(2, "0")
  const year = getYear(date)

  const weekday = date.toLocaleString("en-US", { weekday: "long" })
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "numeric",
    hour12: true,
  })

  switch (getTimestampFormat(date, base)) {
    case "last-week": {
      return `Last ${weekday} at ${time}`
    }
    case "yesterday": {
      return `Yesterday at ${time}`
    }
    case "today": {
      return `Today at ${time}`
    }
    case "tomorrow": {
      return `Tomorrow at ${time}`
    }
    case "this-week": {
      return `${weekday} at ${time}`
    }
    default: {
      return `${day}/${month}/${year}`
    }
  }
}
