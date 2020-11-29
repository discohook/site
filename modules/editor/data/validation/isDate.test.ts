import { isDate } from "./isDate"

describe("isDate", () => {
  it("can validate if a value is a date", () => {
    expect(isDate("2019-04-22T11:02:04.000Z", "$")).toHaveLength(0)
    expect(isDate("1234-56-78T12:34:56.789Z", "$")).toHaveLength(0)
    expect(isDate("2019-04-22T11:02:04Z", "$")).not.toHaveLength(0)
    expect(isDate("XXXX-XX-XXTXX:XX:XX.XXXZ", "$")).not.toHaveLength(0)
    expect(isDate("0-0-0T0:0:0.0Z", "$")).not.toHaveLength(0)
  })
})
