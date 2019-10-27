export type Validator = (value: unknown, key: string) => string[]

export const all = (...validators: Validator[]): Validator => (value, key) =>
  validators.flatMap(validate => validate(value, key))

export const first = (...validators: Validator[]): Validator => (value, key) =>
  validators.reduce(
    (results, validate) =>
      results.some(result => typeof result === "string")
        ? results
        : validate(value, key),
    [] as string[],
  )

export const isString: Validator = (value, key) =>
  typeof value === "string" ? [] : [`${key}: Must be string`]

export const isNumber: Validator = (value, key) =>
  typeof value === "number" ? [] : [`${key}: Must be number`]

export const isBoolean: Validator = (value, key) =>
  typeof value === "boolean" ? [] : [`${key}: Must be boolean`]

export const isObject: Validator = (value, key) =>
  typeof value === "object" &&
  value !== null &&
  !Array.isArray(value) &&
  !(value instanceof Date)
    ? []
    : [`${key}: Must be object`]

export const isArray: Validator = (value, key) =>
  Array.isArray(value) ? [] : [`${key}: Must be array`]

export const isDate: Validator = first(isString, (value, key) =>
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}?Z$/.test(value as string)
    ? []
    : [`${key}: Must be date in ISO 8601 format`],
)

export const optional = (validate: Validator): Validator => (value, key) =>
  value === undefined ? [] : validate(value, key)

export const nullable = (validate: Validator): Validator => (value, key) =>
  value === null ? [] : validate(value, key)

export const contains = (validate: Validator): Validator =>
  first(isArray, (value, key) =>
    (value as unknown[]).flatMap((item, index) =>
      validate(item, `${key}[${index}]`),
    ),
  )

export const isShape = (shape: Record<string, Validator>): Validator =>
  first(isObject, (value, key) =>
    Object.entries(shape).flatMap(([shapeKey, validate]) =>
      validate(
        (value as Record<string, unknown>)[shapeKey],
        `${key}.${shapeKey}`,
      ),
    ),
  )

export const requiresKey = (...keys: string[]): Validator =>
  first(isObject, (value, key) =>
    keys
      .map(requiredKey => requiredKey in (value as object))
      .some(result => result)
      ? []
      : keys.length === 1
      ? [`${key}: Expected key "${keys[0]}"`]
      : [
          `${key}: Expected one of following keys: ${keys
            .map(key => `"${key}"`)
            .join(", ")}`,
        ],
  )

export const requiresKeys = (...keys: string[]): Validator =>
  first(isObject, all(...keys.map(key => requiresKey(key))))

export const minLength = (length: number): Validator => (value, key) =>
  typeof value === "string" && value.trim().length < length
    ? [`${key}: Must be at least ${length} character long`]
    : Array.isArray(value) && value.length < length
    ? [`${key}: Must contain at least ${length} value`]
    : []

export const maxLength = (length: number): Validator => (value, key) =>
  typeof value === "string" && value.trim().length > length
    ? [`${key}: Must be at most ${length} long`]
    : Array.isArray(value) && value.length > length
    ? [`${key}: Must contain at most ${length} values`]
    : []

export const length = (min: number, max: number): Validator =>
  first(minLength(min), maxLength(max))

export const between = (min: number, max: number): Validator =>
  first(isNumber, (value, key) =>
    min > (value as number) || max < (value as number)
      ? [`${key}: Must be between ${min} and ${max} inclusive`]
      : [],
  )

export const isAuthor: Validator = first(
  requiresKey("name"),
  isShape({
    name: first(isString, length(1, 256)),
    url: optional(isString),
    iconUrl: optional(isString),
  }),
)

export const isFooter: Validator = first(
  requiresKey("text"),
  isShape({
    text: first(isString, length(1, 2048)),
    iconUrl: optional(isString),
  }),
)

export const isField: Validator = first(
  requiresKeys("name", "value"),
  isShape({
    name: first(isString, length(1, 256)),
    value: first(isString, length(1, 1024)),
    inline: optional(isBoolean),
  }),
)

export const isEmbed: Validator = first(
  requiresKey(
    "title",
    "description",
    "url",
    "timestamp",
    "color",
    "footer",
    "image",
    "thumbnail",
    "author",
    "fields",
  ),
  isShape({
    title: optional(first(isString, length(1, 256))),
    description: optional(first(isString, length(1, 2048))),
    url: optional(isString),
    timestamp: optional(isDate),
    color: optional(nullable(between(0, 0xffffff))),
    footer: optional(isFooter),
    image: optional(first(requiresKey("url"), isShape({ url: isString }))),
    thumbnail: optional(first(requiresKey("url"), isShape({ url: isString }))),
    author: optional(isAuthor),
    fields: optional(first(isArray, length(1, 25), contains(isField))),
  }),
)

export const isMessage: Validator = first(
  requiresKey("content", "embeds"),
  isShape({
    content: optional(first(isString, length(1, 2000))),
    embeds: optional(first(isArray, length(1, 10), contains(isEmbed))),
    username: optional(first(isString, length(1, 256))),
    avatarUrl: optional(isString),
  }),
)
