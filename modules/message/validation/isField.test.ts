import { isField } from "./isField"

describe("isField", () => {
  it("validates discord field objects", () => {
    const valid = [
      { name: "Field", value: "Value" },
      { name: "Field", value: "Value", inline: true },
      { name: "Field", value: "Value", inline: false },
    ]

    for (const field of valid) {
      expect(isField(field, "$")).toHaveLength(0)
    }

    const invalid = [
      {},
      { name: "Field" },
      { value: "Value" },
      { name: "Field", inline: true },
      { value: "Value", inline: false },
      { inline: true },
      { inline: false },
    ]

    for (const field of invalid) {
      expect(isField(field, "$")).not.toHaveLength(0)
    }
  })
})
