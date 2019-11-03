import { initialMessage } from "../message/initialMessage"
import {
  all,
  between,
  contains,
  first,
  isArray,
  isAuthor,
  isBoolean,
  isDate,
  isEmbed,
  isField,
  isFooter,
  isMessage,
  isNumber,
  isObject,
  isShape,
  isString,
  length,
  maxLength,
  minLength,
  nullable,
  optional,
  requiresKey,
  requiresKeys,
} from "./validation"

describe("all", () => {
  it("can compose multiple validators", () => {
    const pass = jest.fn(() => [])
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    expect(all(fail, fail)(undefined, "$")).toEqual(["$: Fail", "$: Fail"])
    expect(fail.mock.calls.length).toBe(2)

    expect(all(fail, pass)(undefined, "$")).toEqual(["$: Fail"])
    expect(fail.mock.calls.length).toBe(3)
    expect(pass.mock.calls.length).toBe(1)
  })
})

describe("first", () => {
  it("can compose multiple validators", () => {
    const pass = jest.fn(() => [])
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    expect(first(pass, pass)(undefined, "$")).toEqual([])
    expect(pass).toHaveBeenCalledTimes(2)

    expect(first(fail, pass)(undefined, "$")).toEqual(["$: Fail"])
    expect(fail).toHaveBeenCalledTimes(1)
    expect(pass).toHaveBeenCalledTimes(2)
  })
})

describe("isString", () => {
  it("can validate if a value is a string", () => {
    expect(isString("a string", "$")).toHaveLength(0)
    expect(isString("test", "$")).toHaveLength(0)
  })

  it("can validate if a value is not a string", () => {
    expect(isString(1, "$")).not.toHaveLength(0)
    expect(isString(Infinity, "$")).not.toHaveLength(0)
    expect(isString(NaN, "$")).not.toHaveLength(0)
    expect(isString(false, "$")).not.toHaveLength(0)
    expect(isString({}, "$")).not.toHaveLength(0)
    expect(isObject({ foo: "bar" }, "$")).toHaveLength(0)
    expect(isString([], "$")).not.toHaveLength(0)
    expect(isString(null, "$")).not.toHaveLength(0)
    expect(isString(undefined, "$")).not.toHaveLength(0)
  })
})

describe("isNumber", () => {
  it("can validate if a value is a number", () => {
    expect(isNumber(0, "$")).toHaveLength(0)
    expect(isNumber(2, "$")).toHaveLength(0)
    expect(isNumber(Infinity, "$")).toHaveLength(0)
    expect(isNumber(-Infinity, "$")).toHaveLength(0)
    expect(isNumber(NaN, "$")).toHaveLength(0)
  })

  it("can validate if a value is not a number", () => {
    expect(isNumber("definitely a string", "$")).not.toHaveLength(0)
    expect(isNumber(false, "$")).not.toHaveLength(0)
    expect(isNumber({}, "$")).not.toHaveLength(0)
    expect(isObject({ foo: "bar" }, "$")).toHaveLength(0)
    expect(isNumber([], "$")).not.toHaveLength(0)
    expect(isNumber(null, "$")).not.toHaveLength(0)
    expect(isNumber(undefined, "$")).not.toHaveLength(0)
  })
})

describe("isBoolean", () => {
  it("can validate if a value is a boolean", () => {
    expect(isBoolean(true, "$")).toHaveLength(0)
    expect(isBoolean(false, "$")).toHaveLength(0)
  })

  it("can validate if a value is not a boolean", () => {
    expect(isBoolean("trust me it's a string", "$")).not.toHaveLength(0)
    expect(isBoolean(1234567890, "$")).not.toHaveLength(0)
    expect(isBoolean(-(-(-Infinity)), "$")).not.toHaveLength(0)
    expect(isBoolean({}, "$")).not.toHaveLength(0)
    expect(isObject({ foo: "bar" }, "$")).toHaveLength(0)
    expect(isBoolean([], "$")).not.toHaveLength(0)
    expect(isBoolean(null, "$")).not.toHaveLength(0)
    expect(isBoolean(undefined, "$")).not.toHaveLength(0)
  })
})

describe("isObject", () => {
  it("can validate if a value is an object", () => {
    expect(isObject({}, "$")).toHaveLength(0)
    expect(isObject({ foo: "bar" }, "$")).toHaveLength(0)
    expect(
      isObject({ theQuickBrownFoxJumpsOverTheLazyDog: "like always" }, "$"),
    ).toHaveLength(0)
  })

  it("can validate if a value is not an object", () => {
    expect(isObject("still a string", "$")).not.toHaveLength(0)
    expect(isObject(1, "$")).not.toHaveLength(0)
    expect(isObject(Infinity, "$")).not.toHaveLength(0)
    expect(isObject(NaN, "$")).not.toHaveLength(0)
    expect(isObject(false, "$")).not.toHaveLength(0)
    expect(isObject([], "$")).not.toHaveLength(0)
    expect(isObject(null, "$")).not.toHaveLength(0)
    expect(isObject(undefined, "$")).not.toHaveLength(0)
  })
})

describe("isArray", () => {
  it("can validate if a value is an object", () => {
    expect(isArray([], "$")).toHaveLength(0)
    expect(isArray([1, 2, 3], "$")).toHaveLength(0)
    expect(
      isArray(["arrays can contain", expect.anything()], "$"),
    ).toHaveLength(0)
    expect(isArray([{ badPun: "I am sorry" }], "$")).toHaveLength(0)
  })

  it("can validate if a value is not an object", () => {
    expect(isArray("still a string", "$")).not.toHaveLength(0)
    expect(isArray(1, "$")).not.toHaveLength(0)
    expect(isArray(Infinity, "$")).not.toHaveLength(0)
    expect(isArray(NaN, "$")).not.toHaveLength(0)
    expect(isArray(false, "$")).not.toHaveLength(0)
    expect(isBoolean({}, "$")).not.toHaveLength(0)
    expect(isObject({ foo: "bar" }, "$")).toHaveLength(0)
    expect(isArray(null, "$")).not.toHaveLength(0)
    expect(isArray(undefined, "$")).not.toHaveLength(0)
  })
})

describe("isDate", () => {
  it("can validate if a value is a date", () => {
    expect(isDate("2019-04-22T11:02:04.000Z", "$")).toHaveLength(0)
    expect(isDate("1234-56-78T12:34:56.789Z", "$")).toHaveLength(0)

    expect(isDate("2019-04-22T11:02:04Z", "$")).not.toHaveLength(0)
    expect(isDate("XXXX-XX-XXTXX:XX:XX.XXXZ", "$")).not.toHaveLength(0)
    expect(isDate("0-0-0T0:0:0.0Z", "$")).not.toHaveLength(0)
  })
})

describe("optional", () => {
  it("can pass on undefined values", () => {
    const pass = jest.fn(() => [])
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    expect(optional(fail)(undefined, "$")).toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(0)

    expect(optional(fail)(null, "$")).not.toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(1)

    expect(optional(pass)("s t r i n g", "$")).toHaveLength(0)
    expect(pass).toHaveBeenCalledTimes(1)
  })
})

describe("nullable", () => {
  it("can pass on null values", () => {
    const pass = jest.fn(() => [])
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    expect(nullable(fail)(null, "$")).toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(0)

    expect(nullable(fail)(undefined, "$")).not.toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(1)

    expect(nullable(pass)("s t r i n g", "$")).toHaveLength(0)
    expect(pass).toHaveBeenCalledTimes(1)
  })
})

describe("contains", () => {
  it("does not call validators with an empty array", () => {
    const pass = jest.fn(() => [])

    expect(contains(pass)([], "$")).toHaveLength(0)
    expect(pass).toHaveBeenCalledTimes(0)
  })

  it("validates each item in the array", () => {
    const pass = jest.fn(() => [])

    expect(contains(pass)([1, 2, 3], "$")).toHaveLength(0)
    expect(pass).toHaveBeenCalledTimes(3)
    expect(pass).toHaveBeenCalledWith(1, "$[0]")
    expect(pass).toHaveBeenCalledWith(2, "$[1]")
    expect(pass).toHaveBeenCalledWith(3, "$[2]")
  })

  it("shows errors for each item", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    expect(contains(fail)([1, 2, 3], "$")).toHaveLength(3)
    expect(fail).toHaveBeenCalledTimes(3)
    expect(fail).toHaveBeenCalledWith(1, "$[0]")
    expect(fail).toHaveBeenCalledWith(2, "$[1]")
    expect(fail).toHaveBeenCalledWith(3, "$[2]")
  })
})

describe("isShape", () => {
  it("validates object shapes", () => {
    const pass = jest.fn(() => [])

    expect(isShape({})({}, "$")).toHaveLength(0)
    expect(pass).toHaveBeenCalledTimes(0)

    expect(isShape({ key: pass })({ key: "not value" }, "$")).toHaveLength(0)
    expect(pass).toHaveBeenCalledTimes(1)
    expect(pass).toHaveBeenCalledWith("not value", "$.key")

    expect(
      isShape({ one: pass, two: pass })({ one: 1, two: 2 }, "$"),
    ).toHaveLength(0)
    expect(pass).toHaveBeenCalledTimes(3)
    expect(pass).toHaveBeenCalledWith(1, "$.one")
    expect(pass).toHaveBeenCalledWith(2, "$.two")
  })

  it("ignores excessive keys", () => {
    const pass = jest.fn(() => [])

    expect(
      isShape({ foo: pass })({ foo: "bar", baz: "qux" }, "$"),
    ).toHaveLength(0)
    expect(pass).toHaveBeenCalledTimes(1)
  })

  it("ignores missing keys", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    expect(isShape({ key: fail })({}, "$")).toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(0)

    expect(isShape({ key: fail, another: fail })({}, "$")).toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(0)
  })

  it("fails when a validator does not match", () => {
    const fail = jest.fn((_: unknown, key: string) => [`${key}: Fail`])

    expect(isShape({ key: fail })({ key: "oh no" }, "$")).not.toHaveLength(0)
    expect(fail).toHaveBeenCalledTimes(1)
  })
})

describe("requiresKey", () => {
  it("validates if one of the object keys exist", () => {
    expect(requiresKey("foo")({ foo: "bar" }, "$")).toHaveLength(0)
    expect(requiresKey("foo")({}, "$")).not.toHaveLength(0)
    expect(requiresKey("foo", "bar")({ foo: "haha" }, "$")).toHaveLength(0)
    expect(requiresKey("foo", "bar")({ bar: "funny" }, "$")).toHaveLength(0)
    expect(requiresKey("foo", "bar")({}, "$")).not.toHaveLength(0)
  })

  it("ignores excessive object keys", () => {
    expect(requiresKey("foo")({ foo: "bar", baz: "qux" }, "$")).toHaveLength(0)
  })
})

describe("requiresKeys", () => {
  it("validates if all keys exist", () => {
    expect(requiresKeys("foo")({ foo: "bar" }, "$")).toHaveLength(0)
    expect(requiresKeys("foo")({}, "$")).not.toHaveLength(0)
    expect(requiresKeys("foo", "bar")({ foo: 1, bar: 2 }, "$")).toHaveLength(0)
    expect(requiresKeys("foo", "bar")({ foo: 1 }, "$")).not.toHaveLength(0)
    expect(requiresKeys("foo", "bar")({ bar: 2 }, "$")).not.toHaveLength(0)
    expect(requiresKeys("foo", "bar")({}, "$")).not.toHaveLength(0)
  })

  it("ignores excessive object keys", () => {
    expect(requiresKey("foo")({ foo: "bar", baz: "qux" }, "$")).toHaveLength(0)
  })
})

describe("minLength", () => {
  it("validates minimum length of strings", () => {
    expect(minLength(1)("test", "$")).toHaveLength(0)
    expect(minLength(0)("", "$")).toHaveLength(0)
    expect(minLength(1)("", "$")).not.toHaveLength(0)
  })

  it("validates minimum length of arrays", () => {
    expect(minLength(0)([1, 2, 3], "$")).toHaveLength(0)
    expect(minLength(0)(["some value"], "$")).toHaveLength(0)
    expect(minLength(1)([], "$")).not.toHaveLength(0)
    expect(minLength(0)([], "$")).toHaveLength(0)
  })
})

describe("maxLength", () => {
  it("validates maximum length of strings", () => {
    expect(maxLength(10)("this is a long string", "$")).not.toHaveLength(0)
    expect(maxLength(1)("", "$")).toHaveLength(0)
    expect(maxLength(1)("1", "$")).toHaveLength(0)
    expect(maxLength(1)("12", "$")).not.toHaveLength(0)
  })

  it("validates maximum length of arrays", () => {
    expect(maxLength(10)([1, 2, 3], "$")).toHaveLength(0)
    expect(maxLength(5)(["a value", "another value"], "$")).toHaveLength(0)
    expect(maxLength(5)([1, 2, 3, 4, 5], "$")).toHaveLength(0)
    expect(maxLength(5)([1, 2, 3, 4, 5, 6], "$")).not.toHaveLength(0)
  })
})

describe("length", () => {
  it("validates minimum and maximum length of strings", () => {
    expect(length(1, 5)("1", "$")).toHaveLength(0)
    expect(length(0, 5)("12345", "$")).toHaveLength(0)
    expect(length(1, 5)("long string", "$")).not.toHaveLength(0)
  })

  it("validates minimum and maximum length of arrays", () => {
    expect(length(0, 5)([1, 2, 3], "$")).toHaveLength(0)
    expect(length(0, 5)([1, 2, 3, 4, 5, 6], "$")).not.toHaveLength(0)
    expect(length(1, 5)([], "$")).not.toHaveLength(0)
  })
})

describe("between", () => {
  it("validates number ranges", () => {
    expect(between(0, 1)(-1, "$")).not.toHaveLength(0)
    expect(between(0, 1)(0, "$")).toHaveLength(0)
    expect(between(0, 1)(1, "$")).toHaveLength(0)
    expect(between(0, 1)(2, "$")).not.toHaveLength(0)
    expect(between(5, 10)(4, "$")).not.toHaveLength(0)
    expect(between(5, 10)(5, "$")).toHaveLength(0)
    expect(between(5, 10)(10, "$")).toHaveLength(0)
    expect(between(5, 10)(11, "$")).not.toHaveLength(0)
  })
})

/* eslint-disable @typescript-eslint/camelcase */

describe("isAuthor", () => {
  it("validates discord author objects", () => {
    const valid = [
      { name: "Me" },
      { name: "Me", url: "https://example.com/" },
      {
        name: "Me",
        icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      {
        name: "Me",
        url: "https://example.com/",
        icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
    ]

    for (const author of valid) {
      expect(isAuthor(author, "$")).toHaveLength(0)
    }

    const invalid = [
      {},
      { url: "https://example.com/" },
      { icon_url: "https://cdn.discordapp.com/embed/avatars/0.png" },
      {
        url: "https://example.com/",
        icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
      { name: "" },
    ]

    for (const author of invalid) {
      expect(isAuthor(author, "$")).not.toHaveLength(0)
    }
  })
})

describe("isFooter", () => {
  it("validates discord footer objects", () => {
    const valid = [
      { text: "Footnote" },
      {
        text: "Footnote",
        icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
    ]

    for (const footer of valid) {
      expect(isFooter(footer, "$")).toHaveLength(0)
    }

    const invalid = [
      {},
      { icon_url: "https://cdn.discordapp.com/embed/avatars/0.png" },
      { text: "" },
    ]

    for (const footer of invalid) {
      expect(isFooter(footer, "$")).not.toHaveLength(0)
    }
  })
})

describe("isField", () => {
  it("validates discord field objects", () => {
    const valid = [
      { name: "Field", value: "Value" },
      { name: "Field", value: "Value", inline: true },
      { name: "Field", value: "Value", inline: false },
    ]

    for (const field of valid) {
      expect(isField(field, "$")).toHaveLength(0)
    }

    const invalid = [
      {},
      { name: "Field" },
      { value: "Value" },
      { name: "Field", inline: true },
      { value: "Value", inline: false },
      { inline: true },
      { inline: false },
    ]

    for (const field of invalid) {
      expect(isField(field, "$")).not.toHaveLength(0)
    }
  })
})

describe("isEmbed", () => {
  it("validates discord embed objects", () => {
    const valid = [
      { description: "Test embed" },
      { title: "Title" },
      { url: "https://example.com/" },
      { timestamp: "2019-04-22T11:02:04.000Z" },
      { color: 0x000000 },
      { color: 0xffffff },
      { color: null },
      { footer: { text: "Footer" } },
      { image: { url: "https://cdn.discordapp.com/embed/avatars/0.png" } },
      {
        thumbnail: { url: "https://cdn.discordapp.com/embed/avatars/0.png" },
      },
      { author: { name: "Someone" } },
      { fields: [{ name: "Some field", value: "Value" }] },
    ]

    for (const embed of valid) {
      expect(isEmbed(embed, "$")).toHaveLength(0)
    }

    const invalid = [
      {},
      { description: "" },
      { title: "" },
      { color: 0xffffff + 1 },
      { footer: {} },
      { image: {} },
      { thumbnail: {} },
      { author: {} },
      { fields: {} },
    ]

    for (const embed of invalid) {
      expect(isEmbed(embed, "$")).not.toHaveLength(0)
    }
  })
})

describe("isMessage", () => {
  it("validates discord message objects", () => {
    const valid = [
      initialMessage,
      { content: "Hey" },
      { embeds: [{ description: "Embed" }] },
      { username: "Someone", content: "Hey" },
      {
        avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
        content: "Hey",
      },
      {
        username: "Someone",
        avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
        content: "Hey",
      },
      {
        username: "A robot",
        avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
        embeds: [{ description: "Test" }],
      },
    ]

    for (const message of valid) {
      expect(isMessage(message, "$")).toHaveLength(0)
    }

    const invalid = [
      {},
      { username: "Someone" },
      { avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png" },
      {
        username: "Someone",
        avatar_url: "https://cdn.discordapp.com/embed/avatars/0.png",
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
    ]

    for (const message of invalid) {
      expect(isMessage(message, "$")).not.toHaveLength(0)
    }
  })
})
