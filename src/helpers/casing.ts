const mapKeys = (obj: Record<string, any>, fn: (key: string) => string) => {
  const result: Record<string, any> = {}

  for (const key in obj) {
    const isObject =
      typeof obj[key] === "object" &&
      obj[key] !== null &&
      !(obj[key] instanceof Date) &&
      !Array.isArray(obj[key])

    result[fn(key)] = isObject ? mapKeys(obj[key], fn) : obj[key]
  }

  return result
}

export const toSnakeCase = (obj: Record<string, any>) =>
  mapKeys(obj, (key) =>
    key.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`),
  )

export const toCamelCase = (obj: Record<string, any>) =>
  mapKeys(obj, (key) =>
    key.replace(/_[a-z]/g, (match) => `${match.toUpperCase()}`.substring(1)),
  )
