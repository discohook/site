/* eslint-disable @typescript-eslint/naming-convention */

import { isAuthor } from "./isAuthor"

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
