import { formatTimestamp } from "./formatTimestamp"

describe("formatTimestamp", () => {
  it("formats timestamps correctly", () => {
    const base = new Date("2019-04-22T11:02:04.000Z")

    const timestamps = [
      {
        date: new Date("2019-08-15T01:21:05.715Z"),
        formatted: "15/08/2019",
      },
      {
        date: new Date("2019-04-22T11:02:04.000Z"),
        formatted: "Today at 11:02 AM",
      },
      {
        date: new Date("2019-04-21T07:12:54.000Z"),
        formatted: "Yesterday at 07:12 AM",
      },
      {
        date: new Date("2019-04-23T18:23:03.000Z"),
        formatted: "Tomorrow at 06:23 PM",
      },
      {
        date: new Date("2019-04-26T11:02:34.000Z"),
        formatted: "Friday at 11:02 AM",
      },
      {
        date: new Date("2019-04-19T00:08:15.000Z"),
        formatted: "Last Friday at 12:08 AM",
      },

      // AM/PM
      {
        date: new Date("2019-04-22T23:59:59.999Z"),
        formatted: "Today at 11:59 PM",
      },
      {
        date: new Date("2019-04-22T00:00:00.000Z"),
        formatted: "Today at 12:00 AM",
      },
      {
        date: new Date("2019-04-22T00:59:59.999Z"),
        formatted: "Today at 12:59 AM",
      },
      {
        date: new Date("2019-04-22T01:00:00.000Z"),
        formatted: "Today at 01:00 AM",
      },
      {
        date: new Date("2019-04-22T11:59:59.999Z"),
        formatted: "Today at 11:59 AM",
      },
      {
        date: new Date("2019-04-22T12:00:00.000Z"),
        formatted: "Today at 12:00 PM",
      },
      {
        date: new Date("2019-04-22T12:59:59.999Z"),
        formatted: "Today at 12:59 PM",
      },
      {
        date: new Date("2019-04-22T13:00:00.000Z"),
        formatted: "Today at 01:00 PM",
      },

      // Edge cases
      {
        date: new Date("2019-04-29T11:02:04.000Z"),
        formatted: "29/04/2019",
      },
      {
        date: new Date("2019-04-15T11:02:04.000Z"),
        formatted: "15/04/2019",
      },
      {
        date: new Date("2019-04-21T11:02:04.000Z"),
        formatted: "Yesterday at 11:02 AM",
      },
      {
        date: new Date("2019-04-23T11:02:04.000Z"),
        formatted: "Tomorrow at 11:02 AM",
      },
    ]

    for (const { date, formatted } of timestamps) {
      expect(formatTimestamp(date, base)).toEqual(formatted)
    }
  })

  it("returns invalid on bad timestamps", () => {
    expect(formatTimestamp(new Date(Number.NaN))).toEqual("Invalid date")
  })
})
