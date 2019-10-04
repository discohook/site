import { getHumanReadableSize } from "./getHumanReadableSize"

describe("human readable file sizes", () => {
  it.each<[number, string]>([
    [0, "0 bytes"],
    [1, "1 bytes"],
    [768, "768 bytes"],
    [1000, "1,000 bytes"],
    [1023, "1,023 bytes"],
    [1024, "1 KB"],
    [1234, "1.21 KB"],
    [256256, "250.25 KB"],
    [1024000, "1,000 KB"],
    [1048575, "1,024 KB"],
    [1048576, "1 MB"],
    [16221470, "15.47 MB"],
    [50000000, "47.68 MB"],
  ])("formats file sizes correctly (%p -> %p)", (input, expected) => {
    expect(getHumanReadableSize(input)).toEqual(expected)
  })
})
