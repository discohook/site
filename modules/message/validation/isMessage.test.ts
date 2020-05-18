import { INITIAL_MESSAGE_DATA } from "../initialMessageData"
import { isMessage } from "./isMessage"

describe("isMessage", () => {
  it("validates discord message objects", () => {
    const valid = [
      INITIAL_MESSAGE_DATA,
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
