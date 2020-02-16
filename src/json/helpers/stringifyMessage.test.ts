import { stringifyMessage } from "./stringifyMessage"

describe("stringifyMessage", () => {
  it("stringifies messages", () => {
    expect(
      stringifyMessage({
        embeds: [
          {
            author: {
              iconUrl: "https://discohook.org/snake_case_test",
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
        '        "icon_url": "https://discohook.org/snake_case_test"\n' +
        "      }\n" +
        "    }\n" +
        "  ]\n" +
        "}",
    )
  })
})
