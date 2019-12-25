import { formatTimestamp } from "./formatTimestamp"

describe("formatTimestamp", () => {
  it("formats timestamps correctly", () => {
    const base = new Date("2019-04-22T11:02:04.000Z")

    const timestamps = [
      { iso: "2019-08-15T01:21:05.715Z", formatted: "15/08/2019" },
      { iso: "2019-04-22T11:02:04.000Z", formatted: "Today at 11:02 AM" },
      { iso: "2019-04-21T07:12:54.000Z", formatted: "Yesterday at 07:12 AM" },
      { iso: "2019-04-23T18:23:03.000Z", formatted: "Tomorrow at 06:23 PM" },
      { iso: "2019-04-26T11:02:34.000Z", formatted: "Friday at 11:02 AM" },
      { iso: "2019-04-19T00:08:15.000Z", formatted: "Last Friday at 12:08 AM" },

      // AM/PM
      { iso: "2019-04-22T23:59:59.999Z", formatted: "Today at 11:59 PM" },
      { iso: "2019-04-22T00:00:00.000Z", formatted: "Today at 12:00 AM" },
      { iso: "2019-04-22T00:59:59.999Z", formatted: "Today at 12:59 AM" },
      { iso: "2019-04-22T01:00:00.000Z", formatted: "Today at 01:00 AM" },
      { iso: "2019-04-22T11:59:59.999Z", formatted: "Today at 11:59 AM" },
      { iso: "2019-04-22T12:00:00.000Z", formatted: "Today at 12:00 PM" },
      { iso: "2019-04-22T12:59:59.999Z", formatted: "Today at 12:59 PM" },
      { iso: "2019-04-22T13:00:00.000Z", formatted: "Today at 01:00 PM" },

      // Edge cases
      { iso: "2019-04-29T11:02:04.000Z", formatted: "29/04/2019" },
      { iso: "2019-04-15T11:02:04.000Z", formatted: "15/04/2019" },
      { iso: "2019-04-21T11:02:04.000Z", formatted: "Yesterday at 11:02 AM" },
      { iso: "2019-04-23T11:02:04.000Z", formatted: "Tomorrow at 11:02 AM" },
    ]

    for (const { iso, formatted } of timestamps) {
      expect(formatTimestamp(iso, base)).toEqual(formatted)
    }
  })

  it("returns invalid on bad timestamps", () => {
    const timestamps = [
      // Empty
      "",
      // Missing 'Z'
      "2019-04-22T11:02:04.000",
      // Missing ms
      "2019-04-22T11:02:04Z",
      // Missing seconds
      "2019-04-22T11:02",
      // Missing time
      "2019-04-22",
      // Missing leading zeroes in date
      "2019-4-22T11:02:04.000Z",
      // Missing leading zeroes in time
      "2019-04-22T11:2:4.0Z",
    ]

    for (const timestamp of timestamps) {
      expect(formatTimestamp(timestamp)).toEqual("Invalid date")
    }
  })
})
