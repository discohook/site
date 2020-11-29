import { isUrl } from "./isUrl"

describe("isUrl", () => {
  it("validates urls", () => {
    expect(isUrl("garbage", "$")).not.toHaveLength(0)
    expect(isUrl("https://example.com/", "$")).toHaveLength(0)
  })
})
