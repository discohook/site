import { applyIds } from "./applyIds"
import { MessageWithoutIds } from "./Message"
import { id } from "./uid"

const message: MessageWithoutIds = {
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
    { title: "Another cool embed", description: "also, with a description" },
  ],
  username: "Someone",
  avatarUrl: "https://example.com/",
}

describe("applyIds", () => {
  it("does not modify message", () => {
    const withIds = applyIds(message)

    // Copying the object trough JSON removes all symbol keys as there's
    // no way to represent symbols in JSON
    expect(JSON.parse(JSON.stringify(withIds))).toEqual(message)
  })

  it("applies unique ids to embeds", () => {
    const withIds = applyIds(message)

    const ids = (withIds.embeds || []).map(embed => embed[id])
    expect(ids.length).toBe(new Set(ids).size)
  })

  it("applies unique ids to fields", () => {
    const withIds = applyIds(message)

    const ids = ((withIds.embeds || [])[0].fields || []).map(field => field[id])
    expect(ids.length).toBe(new Set(ids).size)
  })
})
