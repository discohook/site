import { id } from "../message/uid"
import { parseMessage, stringifyMessage } from "./convert"

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
              "icon_url": "https://discohook.jaylineko.com/icons/icon-256.png"
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
          [id]: expect.any(Number),
          title: "Test embed",
          description: "Test embed",
          author: {
            name: "Authors have the dreaded snake case icon_url",
            iconUrl: "https://discohook.jaylineko.com/icons/icon-256.png",
          },
          fields: [
            {
              [id]: expect.any(Number),
              name: "Test field",
              value: "test.",
            },
            {
              [id]: expect.any(Number),
              name: "Another one",
              value: "Yeah!!",
            },
            {
              [id]: expect.any(Number),
              name: "This one's inline",
              value: "Isn't that cool",
              inline: true,
            },
          ],
        },
        {
          [id]: expect.any(Number),
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
    expect(invalidMessage.message).toEqual({
      content: "",
      embeds: [
        {
          [id]: expect.any(Number),
          title: "The message content is empty",
          description: "Very scary",
        },
      ],
    })

    const invalidType = parseMessage("null")

    expect(invalidType.errors).not.toHaveLength(0)
    expect(invalidType.message).toBeNull()
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

describe("stringifyMessage", () => {
  it("stringifies messages", () => {
    expect(
      stringifyMessage({
        embeds: [
          {
            [id]: 0,
            author: {
              iconUrl: "https://discohook.jaylineko.com/snake_case_test",
            },
          },
        ],
      }),
    ).toEqual(
      "" +
        "{\n" +
        '  "embeds": [\n' +
        "    {\n" +
        '      "author": {\n' +
        '        "icon_url": "https://discohook.jaylineko.com/snake_case_test"\n' +
        "      }\n" +
        "    }\n" +
        "  ]\n" +
        "}",
    )
  })
})
