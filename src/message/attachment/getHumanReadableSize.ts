export const getHumanReadableSize = (bytes: number) => {
  const units = ["bytes", "KB", "MB", "GB", "TB", "PB"]

  let unit = 0
  let number = bytes

  while (number >= 1024 && unit < units.length - 1) {
    unit++
    number /= 1024
  }

  const formattedNumber = number.toLocaleString("en-US", {
    maximumFractionDigits: 2,
  })

  return `${formattedNumber} ${units[unit]}`
}
