const mapKeys = (obj: object, fn: (key: string) => string): object => {
  if (Array.isArray(obj)) {
    return obj.map(x =>
      typeof x === "object" && x !== null ? mapKeys(x, fn) : x,
    )
  }

  const result: Record<string, unknown> = {}

  for (const [key, value] of Object.entries(obj)) {
    if (typeof value === "object" && value !== null) {
      result[fn(key)] = mapKeys(value, fn)
    } else {
      result[fn(key)] = value
    }
  }

  return result
}

export const toSnakeCase = (obj: object) =>
  mapKeys(obj, key => key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`))

export const toCamelCase = (obj: object) =>
  mapKeys(obj, key =>
    key.replace(/_[a-z]/g, match => `${match.toUpperCase()}`.substring(1)),
  )
