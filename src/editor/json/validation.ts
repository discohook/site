type Validator = (value: unknown, key: string) => string[]

const all = (...validators: Validator[]): Validator => (value, key) =>
  validators.flatMap((validate) => validate(value, key))

const first = (...validators: Validator[]): Validator => (value, key) =>
  validators.reduce(
    (results, validate) =>
      results.some((result) => typeof result === "string")
        ? results
        : validate(value, key),
    [] as string[],
  )

const isString: Validator = (value, key) =>
  typeof value === "string" ? [] : [`${key}: Must be string`]

const isNumber: Validator = (value, key) =>
  typeof value === "number" ? [] : [`${key}: Must be number`]

const isBoolean: Validator = (value, key) =>
  typeof value === "boolean" ? [] : [`${key}: Must be boolean`]

const isObject: Validator = (value, key) =>
  typeof value === "object" && value !== null ? [] : [`${key}: Must be object`]

const isArray: Validator = (value, key) =>
  Array.isArray(value) ? [] : [`${key}: Must be array`]

const isDate: Validator = first(isString, (value, key) =>
  /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}?Z$/.test(value as string)
    ? []
    : [`${key}: Must be date in ISO 8601 format`],
)

const optional = (validate: Validator): Validator => (value, key) =>
  value === undefined ? [] : validate(value, key)

const contains = (validate: Validator): Validator =>
  first(isArray, (value, key) =>
    (value as any[]).flatMap((item, index) =>
      validate(item, `${key}[${index}]`),
    ),
  )

const isShape = (shape: Record<string, Validator>): Validator =>
  first(isObject, (value, key) =>
    Object.entries(shape).flatMap(([shapeKey, validate]) =>
      validate((value as any)[shapeKey], `${key}.${shapeKey}`),
    ),
  )

const requiresKey = (...keys: string[]): Validator =>
  first(isObject, (value, key) =>
    keys
      .map((requiredKey) => (value as Object).hasOwnProperty(requiredKey))
      .some((result) => result)
      ? []
      : keys.length === 1
      ? [`${key}: Expected key '${keys[0]}'`]
      : [
          `${key}: Expected one of following keys: ${keys
            .map((key) => `'${key}'`)
            .join(", ")}`,
        ],
  )

const requiresKeys = (...keys: string[]): Validator =>
  first(isObject, all(...keys.map((key) => requiresKey(key))))

const minLength = (length: number): Validator => (value, key) =>
  typeof value === "string" && value.trim().length < length
    ? [`${key}: Must be at least ${length} character long`]
    : Array.isArray(value) && value.length < length
    ? [`${key}: Must contain at least ${length} value`]
    : []

const maxLength = (length: number): Validator => (value, key) =>
  typeof value === "string" && value.trim().length > length
    ? [`${key}: Must be at most ${length} long`]
    : Array.isArray(value) && value.length > length
    ? [`${key}: Must contain at most ${length} values`]
    : []

const length = (min: number, max: number): Validator =>
  first(minLength(min), maxLength(max))

const between = (min: number, max: number): Validator =>
  first(isNumber, (value, key) =>
    min <= (value as number) && (value as number) > max
      ? [`${key}: Must be between ${min} and ${max} inclusive`]
      : [],
  )

export const isMessage: Validator = first(
  requiresKey("content", "embeds"),
  isShape({
    content: optional(first(isString, length(1, 2000))),
    embeds: optional(
      first(
        isArray,
        length(1, 10),
        contains(
          first(
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
              color: optional(between(0, 16777215)),
              footer: optional(
                first(
                  requiresKey("text"),
                  isShape({
                    text: first(isString, length(1, 2048)),
                    iconUrl: optional(isString),
                  }),
                ),
              ),
              image: optional(
                first(requiresKey("url"), isShape({ url: isString })),
              ),
              thumbnail: optional(
                first(requiresKey("url"), isShape({ url: isString })),
              ),
              author: optional(
                first(
                  requiresKey("name"),
                  isShape({
                    name: first(isString, length(1, 256)),
                    url: optional(isString),
                    iconUrl: optional(isString),
                  }),
                ),
              ),
              fields: optional(
                first(
                  isArray,
                  length(1, 25),
                  contains(
                    first(
                      requiresKeys("name", "value"),
                      isShape({
                        name: first(isString, length(1, 256)),
                        value: first(isString, length(1, 1024)),
                        inline: optional(isBoolean),
                      }),
                    ),
                  ),
                ),
              ),
            }),
          ),
        ),
      ),
    ),
    username: optional(first(isString, length(1, 256))),
    avatarUrl: optional(isString),
  }),
)
