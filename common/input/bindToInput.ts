// eslint-disable-next-line @typescript-eslint/ban-types
export const bindToInput = <T extends object, K extends keyof T>(
  observable: T,
  key: K,
) => {
  return {
    value: observable[key],
    onChange: (value: T[K]) => {
      observable[key] = value
    },
  }
}
