const isObject = (value: unknown) => typeof value === "object" && value !== null

const mapKeys = (object: object, fn: (key: string) => string): object => {
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

export const toSnakeCase = (object: object) =>
  mapKeys(object, key =>
    key.replace(/[A-Z]/g, match => `_${match.toLowerCase()}`),
  )

export const toCamelCase = (object: object) =>
  mapKeys(object, key =>
    key.replace(/_[a-z]/g, match => match.slice(1).toUpperCase()),
  )
