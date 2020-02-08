import { getHumanReadableSize } from "./getHumanReadableSize"

const sizes = [
  { bytes: 0, readable: "0 bytes" },
  { bytes: 1, readable: "1 bytes" },
  { bytes: 768, readable: "768 bytes" },
  { bytes: 1000, readable: "1,000 bytes" },
  { bytes: 1023, readable: "1,023 bytes" },
  { bytes: 1024, readable: "1 KB" },
  { bytes: 1234, readable: "1.21 KB" },
  { bytes: 256256, readable: "250.25 KB" },
  { bytes: 1024000, readable: "1,000 KB" },
  { bytes: 1048575, readable: "1,024 KB" },
  { bytes: 1048576, readable: "1 MB" },
  { bytes: 16221470, readable: "15.47 MB" },
  { bytes: 50000000, readable: "47.68 MB" },
]

describe("getHumanReadableSize", () => {
  it("formats file sizes correctly", () => {
    for (const { bytes, readable } of sizes) {
      expect(getHumanReadableSize(bytes)).toEqual(readable)
    }
  })
})
