import { ID } from "../constants/id"
import { getFieldsWithWidths } from "./getFieldsWithWidths"

describe("getFieldsWithWidths", () => {
  it("returns full width for non inline fields", () => {
    expect(getFieldsWithWidths([{ [ID]: 0, name: "", value: "" }])).toEqual([
      { [ID]: 0, name: "", value: "", width: "1 / 13" },
    ])

    expect(
      getFieldsWithWidths([
        { [ID]: 0, name: "", value: "" },
        { [ID]: 0, name: "", value: "" },
        { [ID]: 0, name: "", value: "" },
      ]),
    ).toEqual([
      { [ID]: 0, name: "", value: "", width: "1 / 13" },
      { [ID]: 0, name: "", value: "", width: "1 / 13" },
      { [ID]: 0, name: "", value: "", width: "1 / 13" },
    ])
  })

  it("returns full width for single inline field", () => {
    expect(
      getFieldsWithWidths([{ [ID]: 0, name: "", value: "", inline: true }]),
    ).toEqual([{ [ID]: 0, name: "", value: "", inline: true, width: "1 / 13" }])
  })

  it("returns half width for 2 adjacent fields", () => {
    expect(
      getFieldsWithWidths([
        { [ID]: 0, name: "", value: "", inline: true },
        { [ID]: 0, name: "", value: "", inline: true },
      ]),
    ).toEqual([
      { [ID]: 0, name: "", value: "", inline: true, width: "1 / 7" },
      { [ID]: 0, name: "", value: "", inline: true, width: "7 / 13" },
    ])
  })

  it("returns third width for 3 adjacent fields", () => {
    expect(
      getFieldsWithWidths([
        { [ID]: 0, name: "", value: "", inline: true },
        { [ID]: 0, name: "", value: "", inline: true },
        { [ID]: 0, name: "", value: "", inline: true },
      ]),
    ).toEqual([
      { [ID]: 0, name: "", value: "", inline: true, width: "1 / 5" },
      { [ID]: 0, name: "", value: "", inline: true, width: "5 / 9" },
      { [ID]: 0, name: "", value: "", inline: true, width: "9 / 13" },
    ])
  })

  it("does not put more than 3 fields on one row", () => {
    expect(
      getFieldsWithWidths([
        { [ID]: 0, name: "", value: "", inline: true },
        { [ID]: 0, name: "", value: "", inline: true },
        { [ID]: 0, name: "", value: "", inline: true },
        { [ID]: 0, name: "", value: "", inline: true },
      ]),
    ).toEqual([
      { [ID]: 0, name: "", value: "", inline: true, width: "1 / 5" },
      { [ID]: 0, name: "", value: "", inline: true, width: "5 / 9" },
      { [ID]: 0, name: "", value: "", inline: true, width: "9 / 13" },
      { [ID]: 0, name: "", value: "", inline: true, width: "1 / 13" },
    ])
  })

  it("does not put a non inline field on a row with an inline field", () => {
    expect(
      getFieldsWithWidths([
        { [ID]: 0, name: "", value: "", inline: true },
        { [ID]: 0, name: "", value: "", inline: true },
        { [ID]: 0, name: "", value: "" },
        { [ID]: 0, name: "", value: "", inline: true },
        { [ID]: 0, name: "", value: "", inline: true },
      ]),
    ).toEqual([
      { [ID]: 0, name: "", value: "", inline: true, width: "1 / 7" },
      { [ID]: 0, name: "", value: "", inline: true, width: "7 / 13" },
      { [ID]: 0, name: "", value: "", width: "1 / 13" },
      { [ID]: 0, name: "", value: "", inline: true, width: "1 / 7" },
      { [ID]: 0, name: "", value: "", inline: true, width: "7 / 13" },
    ])
  })
})
