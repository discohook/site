const isObject = (x: unknown) => typeof x === "object" && x !== null

const mapKeys = (object: object, fn: (key: string) => string): object => {
  if (Array.isArray(object)) {
    return object.map(x => (isObject(x) ? mapKeys(x, fn) : x))
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
  mapKeys(object, key => key.replace(/[A-Z]/g, m => `_${m.toLowerCase()}`))

export const toCamelCase = (object: object) =>
  mapKeys(object, key => key.replace(/_[a-z]/g, m => m[1].toUpperCase()))
