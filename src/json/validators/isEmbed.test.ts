import { isEmbed } from "./isEmbed"

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
