export const maxLength = (length: number) => (value: string) =>
  value.length > length ? `Exceeds maximum length of ${length}` : false
