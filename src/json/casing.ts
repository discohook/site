const mapKeys = (obj: object, fn: (key: string) => string): object => {
  const isObject = (x: unknown) => typeof x === "object" && x !== null

  if (Array.isArray(obj)) {
    return obj.map(x => (isObject(x) ? mapKeys(x, fn) : x))
  }

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (isObject(value)) {
      result[fn(key)] = mapKeys(value, fn)
    } else {
      result[fn(key)] = value
    }
  }

  return result
}

export const toSnakeCase = (obj: object) =>
  mapKeys(obj, key => key.replace(/([A-Z])/g, (_, l) => `_${l.toLowerCase()}`))

export const toCamelCase = (obj: object) =>
  mapKeys(obj, key => key.replace(/_([a-z])/g, (_, l) => l.toUpperCase()))
