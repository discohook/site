import { parseMessage } from "./parseMessage"

describe("parseMessage", () => {
  it("can parse messages", () => {
    const message = parseMessage(`
      {
        "content": "Hello",
        "embeds": [
          {
            "title": "Test embed",
            "description": "Test embed",
            "author": {
              "name": "Authors have the dreaded snake case icon_url",
              "icon_url": "https://discohook.org/icons/icon-256.png"
            },
            "fields": [
              {
                "name": "Test field",
                "value": "test."
              },
              {
                "name": "Another one",
                "value": "Yeah!!"
              },
              {
                "name": "This one's inline",
                "value": "Isn't that cool",
                "inline": true
              }
            ]
          },
          {
            "title": "Another test embed",
            "description": "This one is quite boring though"
          }
        ]
      }
    `)

    expect(message.message).toEqual({
      content: "Hello",
      embeds: [
        {
          title: "Test embed",
          description: "Test embed",
          author: {
            name: "Authors have the dreaded snake case icon_url",
            iconUrl: "https://discohook.org/icons/icon-256.png",
          },
          fields: [
            {
              name: "Test field",
              value: "test.",
            },
            {
              name: "Another one",
              value: "Yeah!!",
            },
            {
              name: "This one's inline",
              value: "Isn't that cool",
              inline: true,
            },
          ],
        },
        {
          title: "Another test embed",
          description: "This one is quite boring though",
        },
      ],
    })

    expect(message.errors).toHaveLength(0)
  })

  it("returns validation errors", () => {
    const invalidMessage = parseMessage(`
      {
        "content": "",
        "embeds": [
          {
            "title": "The message content is empty",
            "description": "Very scary"
          }
        ]
      }
    `)

    expect(invalidMessage.errors).not.toHaveLength(0)
    expect(invalidMessage.message).toBeUndefined()

    const invalidType = parseMessage("null")

    expect(invalidType.errors).not.toHaveLength(0)
    expect(invalidType.message).toBeUndefined()
  })

  it("does not return a message for json errors", () => {
    const message = parseMessage(`
      {
        embeds: [
          {
            title: "Oops",
            description: "I forgot to put my object keys in quotes"
          }
        ]
      }
    `)

    expect(message.errors).not.toHaveLength(0)
    expect(message.message).toBeUndefined()
  })
})
