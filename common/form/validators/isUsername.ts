export const isUsername = () => {
  return (value: string): string | false => {
    for (const forbidden of ["discord", "```"]) {
      if (value.toLowerCase().includes(forbidden)) {
        return `Username cannot contain "${forbidden}"`
      }
    }
    for (const forbidden of ["everyone", "here"]) {
      if (value.toLowerCase() === forbidden) {
        return `Username cannot be "${forbidden}"`
      }
    }
    return false
  }
}
