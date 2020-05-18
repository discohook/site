import { stringifyMessage } from "./stringifyMessage"

describe("stringifyMessage", () => {
  it("stringifies messages", () => {
    expect(
      stringifyMessage({
        embeds: [
          {
            title: "Hello",
          },
        ],
      }),
    ).toEqual(
      "" +
        "{\n" +
        '  "embeds": [\n' +
        "    {\n" +
        '      "title": "Hello"\n' +
        "    }\n" +
        "  ]\n" +
        "}",
    )
  })
})
