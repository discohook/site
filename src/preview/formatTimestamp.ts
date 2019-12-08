const oneDay = 1000 * 60 * 60 * 24

export const getFormat = (date: Date, base?: Date) => {
  const givenDate = new Date(date).setHours(0, 0, 0, 0)
  const now = new Date(base ?? Date.now()).setHours(0, 0, 0, 0)

  const difference = (givenDate - now) / oneDay

  if (difference < -6) return "full"
  if (difference < -1) return "last-week"
  if (difference < 0) return "yesterday"
  if (difference < 1) return "today"
  if (difference < 2) return "tomorrow"
  if (difference < 7) return "this-week"
  return "full"
}

const iso8601 = /^(\d{4})-(\d{2})-(\d{2})T\d{2}:\d{2}:\d{2}\.\d{3}?Z$/

export const formatTimestamp = (timestamp: string, base?: Date) => {
  const match = iso8601.exec(timestamp)
  if (!match) return "Invalid date"

  const [, year, month, day] = match
  const date = new Date(timestamp)

  const weekday = date.toLocaleString("en-US", { weekday: "long" })
  const time = date.toLocaleString("en-US", {
    hour: "2-digit",
    minute: "numeric",
    hour12: false,
  })

  switch (getFormat(date, base)) {
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
