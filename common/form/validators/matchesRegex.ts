export const matchesRegex = (regex: RegExp, error: string) => (value: string) =>
  !value || regex.test(value) ? false : error
