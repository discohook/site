/* eslint-disable @typescript-eslint/naming-convention */

import { isFooter } from "./isFooter"

describe("isFooter", () => {
  it("validates discord footer objects", () => {
    const valid = [
      { text: "Footnote" },
      {
        text: "Footnote",
        icon_url: "https://cdn.discordapp.com/embed/avatars/0.png",
      },
    ]

    for (const footer of valid) {
      expect(isFooter(footer, "$")).toHaveLength(0)
    }

    const invalid = [
      {},
      { icon_url: "https://cdn.discordapp.com/embed/avatars/0.png" },
      { text: "" },
    ]

    for (const footer of invalid) {
      expect(isFooter(footer, "$")).not.toHaveLength(0)
    }
  })
})
