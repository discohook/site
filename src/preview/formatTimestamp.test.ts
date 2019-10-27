import { formatTimestamp } from "./formatTimestamp"

describe("formatTimestamp", () => {
  it.each<[string, string]>([
    ["2019-08-15T01:21:05.715Z", "15/08/2019"],
    ["2019-04-22T11:02:04.000Z", "Today at 11:02"],
    ["2019-04-21T07:12:54.000Z", "Yesterday at 07:12"],
    ["2019-04-23T18:23:03.000Z", "Tomorrow at 18:23"],
    ["2019-04-26T11:02:34.000Z", "Friday at 11:02"],
    ["2019-04-18T00:08:15.000Z", "Last Thursday at 00:08"],

    // Edge cases
    ["2019-04-29T11:02:04.000Z", "29/04/2019"],
    ["2019-04-15T11:02:04.000Z", "15/04/2019"],
    ["2019-04-21T11:02:04.000Z", "Yesterday at 11:02"],
    ["2019-04-23T11:02:04.000Z", "Tomorrow at 11:02"],
  ])("formats timestamps correctly (%p -> %p)", (input, expected) => {
    const base = new Date("2019-04-22T11:02:04.000Z")

    expect(formatTimestamp(input, base)).toEqual(expected)
  })

  it.each([
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
  ])("returns invalid on bad timestamps (%p)", input => {
    expect(formatTimestamp(input)).toEqual("Invalid date")
  })
})
