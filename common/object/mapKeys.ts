const isObject = (value: unknown) => typeof value === "object" && value !== null

export const mapKeys = (
  object: unknown,
  fn: (key: string) => string,
): Record<string, unknown> | unknown[] => {
  if (Array.isArray(object)) {
    return object.map(value => (isObject(value) ? mapKeys(value, fn) : value))
  }

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(
    object as Record<string, unknown>,
  )) {
    if (isObject(value)) {
      result[fn(key)] = mapKeys(value, fn)
    } else {
      result[fn(key)] = value
    }
  }

  return result
}
