import { id } from "../../message/helpers/getUniqueId"
import { stringifyMessage } from "./stringifyMessage"

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
