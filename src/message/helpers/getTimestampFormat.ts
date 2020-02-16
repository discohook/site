const ONE_DAY = 1000 * 60 * 60 * 24

export const getTimestampFormat = (date: Date, base?: Date) => {
  const givenDate = new Date(date).setHours(0, 0, 0, 0)
  const now = new Date(base ?? Date.now()).setHours(0, 0, 0, 0)

  const difference = (givenDate - now) / ONE_DAY

  if (difference < -6) return "full"
  if (difference < -1) return "last-week"
  if (difference < 0) return "yesterday"
  if (difference < 1) return "today"
  if (difference < 2) return "tomorrow"
  if (difference < 7) return "this-week"
  return "full"
}
