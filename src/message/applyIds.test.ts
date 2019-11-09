import { applyIds } from "./applyIds"
import { id } from "./uid"

describe("applyIds", () => {
  it("does not modify message", () => {
    const message = {
      content: "Nice message",
      embeds: [
        {
          title: "Cool embed",
          description: "with a description",
          url: "https://example.com/",
          timestamp: "2019-04-22T11:02:04.000Z",
          color: 0x7289da,
          footer: { text: "Footer text", iconUrl: "https://example.com/" },
          image: { url: "https://example.com/" },
          thumbnail: { url: "https://example.com/" },
          author: {
            name: "Someone",
            url: "https://example.com/",
            iconUrl: "https://example.com/",
          },
          fields: [
            { name: "Fields", value: "Are pretty cool" },
            { name: "Another field", value: "I think", inline: false },
            { name: "Inline field", value: "They're smaller", inline: true },
          ],
        },
        {
          title: "Another cool embed",
          description: "also, with a description",
        },
      ],
      username: "Someone",
      avatarUrl: "https://example.com/",
    }

    const withIds = applyIds(message)

    // Copying the object trough JSON removes all symbol keys as there's
    // no way to represent symbols in JSON
    expect(JSON.parse(JSON.stringify(withIds))).toEqual(message)
  })

  it("clones objects and arrays", () => {
    const message = {
      embeds: [
        {
          title: "Embed 1",
          fields: [
            { name: "Field 1", value: "Value 1a" },
            { name: "Field 2", value: "Value 2a" },
          ],
        },
        { title: "Embed 2" },
      ],
    }

    const withIds = applyIds(message)

    expect(withIds.embeds).not.toBe(message.embeds)

    const [firstEmbed, secondEmbed] = withIds.embeds
    expect(firstEmbed).not.toBe(message.embeds[0])
    expect(secondEmbed).not.toBe(message.embeds[1])

    expect(firstEmbed.fields).not.toBe(message.embeds[0].fields)

    const [firstField, secondField] = firstEmbed.fields
    expect(firstField).not.toBe(message.embeds[0].fields)
    expect(secondField).not.toBe(message.embeds[1].fields)
  })

  it("applies unique ids to embeds", () => {
    const message = { embeds: [{ title: "Embed 1" }, { title: "Embed 2" }] }
    const withIds = applyIds(message)

    expect.assertions(3)

    for (const embed of withIds.embeds ?? []) {
      expect(embed).toHaveProperty([id])
    }

    const ids = withIds.embeds?.map(embed => embed[id]) ?? []
    expect(new Set(ids).size).toBe(ids.length)
  })

  it("applies unique ids to fields", () => {
    const message = {
      embeds: [
        {
          fields: [
            { name: "Field 1", value: "Value 1" },
            { name: "Field 2", value: "Value 2" },
          ],
        },
        {
          fields: [
            { name: "Field 3", value: "Value 3" },
            { name: "Field 4", value: "Value 4" },
          ],
        },
      ],
    }
    const withIds = applyIds(message)

    expect.assertions(6)

    for (const embed of withIds.embeds ?? []) {
      for (const field of embed.fields ?? []) {
        expect(field).toHaveProperty([id])
      }

      const ids = (embed.fields ?? []).map(field => field[id])
      expect(new Set(ids).size).toBe(ids.length)
    }
  })

  it("handles messages with no embeds", () => {
    const messageWithoutEmbeds = { content: "Thanks!" }
    expect(applyIds(messageWithoutEmbeds)).toEqual(messageWithoutEmbeds)

    const messageWithZeroEmbeds = { embeds: [] }
    expect(applyIds(messageWithZeroEmbeds)).toEqual(messageWithZeroEmbeds)

    const messageWithoutFields = { embeds: [{ description: "This is embed" }] }
    expect(applyIds(messageWithoutFields)).toEqual({
      ...messageWithoutFields,
      embeds: [{ ...messageWithoutFields.embeds[0], [id]: expect.anything() }],
    })

    const messageWithZeroFields = { embeds: [{ fields: [] }] }
    expect(applyIds(messageWithZeroFields)).toEqual({
      embeds: [{ ...messageWithZeroFields.embeds[0], [id]: expect.anything() }],
    })
  })
})
