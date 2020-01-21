import { getTotalCharacterCount } from "./getTotalCharacterCount"

describe("getTotalCharacterCount", () => {
  it("counts message content", () => {
    expect(
      getTotalCharacterCount({
        content: "Hello",
      }),
    ).toEqual(5)

    expect(
      getTotalCharacterCount({
        content: "",
      }),
    ).toEqual(0)
  })

  it("counts embed title", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ title: "Rules" }],
      }),
    ).toEqual(5)

    expect(
      getTotalCharacterCount({
        embeds: [{ title: "" }],
      }),
    ).toEqual(0)
  })

  it("counts embed description", () => {
    expect(
      getTotalCharacterCount({
        embeds: [
          { description: "This is a test embed, it has 48 characters total" },
        ],
      }),
    ).toEqual(48)

    expect(
      getTotalCharacterCount({
        embeds: [{ description: "" }],
      }),
    ).toEqual(0)
  })

  it("counts embed author name", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ author: { name: "Someone" } }],
      }),
    ).toEqual(7)

    expect(
      getTotalCharacterCount({
        embeds: [{ author: { name: "" } }],
      }),
    ).toEqual(0)
  })

  it("counts embed footer", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ footer: { text: "Sent from Discohook:tm:" } }],
      }),
    ).toEqual(23)

    expect(
      getTotalCharacterCount({
        embeds: [{ footer: { text: "" } }],
      }),
    ).toEqual(0)
  })

  it("counts field name", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ fields: [{ name: "Rule 1" }] }],
      }),
    ).toEqual(6)

    expect(
      getTotalCharacterCount({
        embeds: [{ fields: [{ name: "" }] }],
      }),
    ).toEqual(0)
  })

  it("counts field value", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ fields: [{ value: "Be nice to eachother" }] }],
      }),
    ).toEqual(20)

    expect(
      getTotalCharacterCount({
        embeds: [{ fields: [{ value: "" }] }],
      }),
    ).toEqual(0)
  })

  it("does not count timestamp", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ timestamp: "2020-01-19T14:59:56.041Z" }],
      }),
    ).toEqual(0)
  })

  it("does not count color", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ color: 0x7289da }],
      }),
    ).toEqual(0)
  })

  it("does not count embed url", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ url: "https://example.com" }],
      }),
    ).toEqual(0)
  })

  it("does not count author url", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ author: { url: "https://example.com" } }],
      }),
    ).toEqual(0)
  })

  it("does not count message avatar", () => {
    expect(
      getTotalCharacterCount({
        avatarUrl: "https://example.com/image.png",
      }),
    ).toEqual(0)
  })

  it("does not count author avatar", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ author: { iconUrl: "https://example.com/image.png" } }],
      }),
    ).toEqual(0)
  })

  it("does not count embed image", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ image: { url: "https://example.com/image.png" } }],
      }),
    ).toEqual(0)
  })

  it("does not count embed thumbnail", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ thumbnail: { url: "https://example.com/image.png" } }],
      }),
    ).toEqual(0)
  })

  it("does not count footer icon", () => {
    expect(
      getTotalCharacterCount({
        embeds: [{ footer: { iconUrl: "https://example.com/image.png" } }],
      }),
    ).toEqual(0)
  })

  it("does not count message username", () => {
    expect(
      getTotalCharacterCount({
        username: "Magical webhook bot",
      }),
    ).toEqual(0)
  })

  it("counts multiple embeds", () => {
    expect(
      getTotalCharacterCount({
        embeds: new Array(10).fill(undefined).map(() => ({
          title: "Test embed",
        })),
      }),
    ).toEqual(100)
  })

  it("counts multiple fields", () => {
    expect(
      getTotalCharacterCount({
        embeds: [
          {
            fields: new Array(25)
              .fill(undefined)
              .map(() => ({ name: "Test field" })),
          },
        ],
      }),
    ).toEqual(250)
  })

  it("counts multiple fields over multiple embeds", () => {
    const getFields = () =>
      new Array(25).fill(undefined).map(() => ({ name: "Test field" }))

    expect(
      getTotalCharacterCount({
        embeds: new Array(10).fill(undefined).map(() => ({
          title: "Test embed",
          fields: getFields(),
        })),
      }),
    ).toEqual(2600)
  })
})
