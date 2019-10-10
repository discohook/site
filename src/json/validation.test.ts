import { initialMessage } from "../message/initialMessage"
import * as v from "./validation"
import { Validator } from "./validation"

const primitives = [
  [v.isString, "", "test"],
  [v.isNumber, 0, 1, Infinity, -Infinity, NaN],
  [v.isBoolean, true, false],
  [v.isObject, {}],
  [v.isArray, []],
] as [Validator, ...unknown[]][]

const primitiveValues = primitives
  .flatMap(set => set.slice(1))
  .concat([undefined, null])

describe("type validation", () => {
  it("can compose validators", () => {
    const { first, all } = v

    const cont = jest.fn<string[], Parameters<Validator>>(() => [])
    const fail = jest.fn<string[], Parameters<Validator>>((_, key) => [
      `${key}: Fail`,
    ])

    first(cont, cont)(undefined, "$")
    expect(cont.mock.calls.length).toBe(2)

    expect(first(fail, cont)(undefined, "$")).toEqual(["$: Fail"])
    expect(fail.mock.calls.length).toBe(1)
    expect(cont.mock.calls.length).toBe(2)

    expect(all(fail, fail)(undefined, "$")).toEqual(["$: Fail", "$: Fail"])
    expect(fail.mock.calls.length).toBe(3)

    expect(all(fail, cont)(undefined, "$")).toEqual(["$: Fail"])
    expect(fail.mock.calls.length).toBe(4)
    expect(cont.mock.calls.length).toBe(3)
  })

  it("validates primitive types", () => {
    for (const [validate, ...values] of primitives) {
      for (const value of values) {
        expect(validate(value, "$")).toHaveLength(0)
      }

      const falseValues = primitiveValues.filter(
        value => !values.includes(value),
      )

      for (const value of falseValues) {
        expect(validate(value, "$")).not.toHaveLength(0)
      }
    }
  })

  it("validates dates", () => {
    const { isDate } = v

    expect(isDate("2019-04-22T11:02:04.000Z", "$")).toHaveLength(0)
    expect(isDate("1234-56-78T12:34:56.789Z", "$")).toHaveLength(0)

    expect(isDate("2019-04-22T11:02:04Z", "$")).not.toHaveLength(0)
    expect(isDate("XXXX-XX-XXTXX:XX:XX.XXXZ", "$")).not.toHaveLength(0)
    expect(isDate("0-0-0T0:0:0.0Z", "$")).not.toHaveLength(0)

    for (const value of primitiveValues) {
      expect(isDate(value, "$")).not.toHaveLength(0)
    }
  })

  it("validates optionals and nullables", () => {
    const { optional, nullable, isString } = v

    expect(optional(isString)(undefined, "$")).toHaveLength(0)
    expect(optional(isString)(null, "$")).not.toHaveLength(0)
    expect(optional(isString)("", "$")).toHaveLength(0)

    expect(nullable(isString)(undefined, "$")).not.toHaveLength(0)
    expect(nullable(isString)(null, "$")).toHaveLength(0)
    expect(nullable(isString)("", "$")).toHaveLength(0)
  })

  it("validates array contents", () => {
    const { contains, isString } = v

    expect(contains(isString)(["test"], "$")).toHaveLength(0)
    expect(contains(isString)(["one", "two", "three"], "$")).toHaveLength(0)
    expect(contains(isString)([], "$")).toHaveLength(0)
    expect(contains(isString)([1], "$")).not.toHaveLength(0)
    expect(contains(isString)("", "$")).not.toHaveLength(0)
    expect(contains(isString)(undefined, "$")).not.toHaveLength(0)
    expect(contains(isString)(null, "$")).not.toHaveLength(0)
  })

  it("validates object shapes", () => {
    const { isShape, isString, isNumber } = v

    expect(isShape({})({}, "$")).toHaveLength(0)
    expect(isShape({ key: isString })({ key: "value" }, "$")).toHaveLength(0)
    expect(
      isShape({ one: isNumber, two: isNumber })({ one: 1, two: 2 }, "$"),
    ).toHaveLength(0)

    // Ignore excessive keys
    expect(isShape({ a: isString })({ a: "A", b: "B" }, "$")).toHaveLength(0)

    // Fail on missing key
    expect(isShape({ key: isString })({}, "$")).not.toHaveLength(0)

    // Fail when validator doesn't match
    expect(isShape({ key: isString })({ key: 1 }, "$")).not.toHaveLength(0)

    // Fail on bad types
    const validateType = isShape({ demo: isString })
    for (const value of primitiveValues) {
      expect(validateType(value, "$")).not.toHaveLength(0)
    }
  })

  it("validates object key requirements", () => {
    const { requiresKey, requiresKeys } = v

    expect(requiresKey("test")({ test: "test" }, "$")).toHaveLength(0)
    expect(requiresKey("key")({}, "$")).not.toHaveLength(0)
    expect(requiresKey("one")({ one: 1, two: 2 }, "$")).toHaveLength(0)
    expect(requiresKey("one", "two")({ one: 1 }, "$")).toHaveLength(0)
    expect(requiresKey("one", "two")({ two: 2 }, "$")).toHaveLength(0)

    expect(requiresKeys("test")({ test: "test" }, "$")).toHaveLength(0)
    expect(requiresKeys("key")({}, "$")).not.toHaveLength(0)
    expect(requiresKeys("one", "two")({ one: 1, two: 2 }, "$")).toHaveLength(0)
    expect(requiresKeys("one", "two")({ one: 1 }, "$")).not.toHaveLength(0)

    const validate = requiresKey("foo")
    for (const value of primitiveValues) {
      expect(validate(value, "$")).not.toHaveLength(0)
    }
  })

  it("validates array and string lengths", () => {
    const { minLength, maxLength, length } = v

    // Min length
    expect(minLength(0)([1, 2, 3], "$")).toHaveLength(0)
    expect(minLength(0)(["some value"], "$")).toHaveLength(0)
    expect(minLength(0)([], "$")).toHaveLength(0)
    expect(minLength(1)("test", "$")).toHaveLength(0)
    expect(minLength(0)("", "$")).toHaveLength(0)
    expect(minLength(1)("", "$")).not.toHaveLength(0)

    // Max length
    expect(maxLength(10)([1, 2, 3], "$")).toHaveLength(0)
    expect(maxLength(5)(["a value", "another value"], "$")).toHaveLength(0)
    expect(maxLength(10)("this is a long string", "$")).not.toHaveLength(0)
    expect(maxLength(10)([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], "$")).toHaveLength(0)
    expect(maxLength(5)("", "$")).toHaveLength(0)

    // Between length
    expect(length(0, 5)([1, 2, 3], "$")).toHaveLength(0)
    expect(length(1, 5)("1", "$")).toHaveLength(0)
    expect(length(0, 5)("12345", "$")).toHaveLength(0)
    expect(length(0, 5)([1, 2, 3, 4, 5, 6], "$")).not.toHaveLength(0)
    expect(length(1, 5)([], "$")).not.toHaveLength(0)
    expect(length(1, 5)("long string", "$")).not.toHaveLength(0)
  })

  it("validates number ranges", () => {
    const { between } = v

    expect(between(0, 1)(-1, "$")).not.toHaveLength(0)
    expect(between(0, 1)(0, "$")).toHaveLength(0)
    expect(between(0, 1)(1, "$")).toHaveLength(0)
    expect(between(0, 1)(2, "$")).not.toHaveLength(0)
    expect(between(5, 10)(4, "$")).not.toHaveLength(0)
    expect(between(5, 10)(5, "$")).toHaveLength(0)
    expect(between(5, 10)(10, "$")).toHaveLength(0)
    expect(between(5, 10)(11, "$")).not.toHaveLength(0)
  })

  it("validates discord objects", () => {
    const objects = {
      isAuthor: {
        valid: [
          { name: "Me" },
          { name: "Me", url: "https://example.com/" },
          {
            name: "Me",
            iconUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
          },
          {
            name: "Me",
            url: "https://example.com/",
            iconUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
          },
        ],
        invalid: [
          {},
          { url: "https://example.com/" },
          { iconUrl: "https://cdn.discordapp.com/embed/avatars/0.png" },
          {
            url: "https://example.com/",
            iconUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
          },
          { name: "" },
        ],
      },
      isFooter: {
        valid: [
          { text: "Footnote" },
          {
            text: "Footnote",
            iconUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
          },
        ],
        invalid: [
          {},
          { iconUrl: "https://cdn.discordapp.com/embed/avatars/0.png" },
          { text: "" },
        ],
      },
      isField: {
        valid: [
          { name: "Field", value: "Value" },
          { name: "Field", value: "Value", inline: true },
          { name: "Field", value: "Value", inline: false },
        ],
        invalid: [
          {},
          { name: "Field" },
          { value: "Value" },
          { name: "Field", inline: true },
          { value: "Value", inline: false },
          { inline: true },
          { inline: false },
        ],
      },
      isEmbed: {
        valid: [
          { description: "Test embed" },
          { title: "Title" },
          { url: "https://example.com/" },
          { timestamp: "2019-04-22T11:02:04.000Z" },
          { color: 0x000000 },
          { color: 0xffffff },
          { color: null },
          {
            footer: {
              text: "Footer",
            },
          },
          {
            image: {
              url: "https://cdn.discordapp.com/embed/avatars/0.png",
            },
          },
          {
            thumbnail: {
              url: "https://cdn.discordapp.com/embed/avatars/0.png",
            },
          },
          { author: { name: "Someone" } },
          { fields: [{ name: "Some field", value: "Value" }] },
        ],
        invalid: [
          {},
          { description: "" },
          { title: "" },
          { color: 0xffffff + 1 },
          { footer: {} },
          { image: {} },
          { thumbnail: {} },
          { author: {} },
          { fields: {} },
        ],
      },
      isMessage: {
        valid: [
          initialMessage,
          { content: "Hey" },
          { embeds: [{ description: "Embed" }] },
          { username: "Someone", content: "Hey" },
          {
            avatarUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
            content: "Hey",
          },
          {
            username: "Someone",
            avatarUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
            content: "Hey",
          },
          {
            username: "A robot",
            avatarUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
            embeds: [{ description: "Test" }],
          },
        ],
        invalid: [
          {},
          { username: "Someone" },
          { avatarUrl: "https://cdn.discordapp.com/embed/avatars/0.png" },
          {
            username: "Someone",
            avatarUrl: "https://cdn.discordapp.com/embed/avatars/0.png",
          },
          { content: "" },
          { embeds: [] },
          {
            embeds: [
              { description: "One" },
              { description: "Two" },
              { description: "Three" },
              { description: "Four" },
              { description: "Five" },
              { description: "Six" },
              { description: "Seven" },
              { description: "Eight" },
              { description: "Nine" },
              { description: "Ten" },
              { description: "Eleven" },
            ],
          },
        ],
      },
    } as const

    for (const [validatorName, { valid, invalid }] of Object.entries(objects)) {
      const validate = v[validatorName as keyof typeof objects]

      for (const value of valid) {
        expect(validate(value, "$")).toHaveLength(0)
      }

      for (const value of invalid) {
        expect(validate(value, "$")).not.toHaveLength(0)
      }
    }
  })
})
