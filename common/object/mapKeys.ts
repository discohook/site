const isObject = (value: unknown) => typeof value === "object" && value !== null

export const mapKeys = (
  object: object,
  fn: (key: string) => string,
): object => {
  if (Array.isArray(object)) {
    return object.map(value => (isObject(value) ? mapKeys(value, fn) : value))
  }

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(object)) {
    if (isObject(value)) {
      result[fn(key)] = mapKeys(value, fn)
    } else {
      result[fn(key)] = value
    }
  }

  return result
}
