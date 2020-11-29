import { EmbedModel } from "../state/models/EmbedModel"
import { getFieldGridColumn } from "./getFieldGridColumn"

describe("getFieldWidth", () => {
  it("returns full width for non inline fields", () => {
    const embed = EmbedModel.create({
      fields: [{ inline: false }],
    })

    expect(getFieldGridColumn(embed.fields[0])).toBe("1 / 13")
  })

  it("returns full width for single inline field", () => {
    const embed = EmbedModel.create({
      fields: [{ inline: true }],
    })

    expect(getFieldGridColumn(embed.fields[0])).toBe("1 / 13")
  })

  it("returns half width for 2 adjacent fields", () => {
    const embed = EmbedModel.create({
      fields: [{ inline: true }, { inline: true }],
    })

    expect(getFieldGridColumn(embed.fields[0])).toBe("1 / 7")
    expect(getFieldGridColumn(embed.fields[1])).toBe("7 / 13")
  })

  it("returns third width for 3 adjacent fields", () => {
    const embed = EmbedModel.create({
      fields: [{ inline: true }, { inline: true }, { inline: true }],
    })

    expect(getFieldGridColumn(embed.fields[0])).toBe("1 / 5")
    expect(getFieldGridColumn(embed.fields[1])).toBe("5 / 9")
    expect(getFieldGridColumn(embed.fields[2])).toBe("9 / 13")
  })

  it("does not put more than 3 fields on one row", () => {
    const embed = EmbedModel.create({
      fields: [
        { inline: true },
        { inline: true },
        { inline: true },
        { inline: true },
        { inline: true },
        { inline: true },
        { inline: true },
      ],
    })

    expect(getFieldGridColumn(embed.fields[0])).toBe("1 / 5")
    expect(getFieldGridColumn(embed.fields[1])).toBe("5 / 9")
    expect(getFieldGridColumn(embed.fields[2])).toBe("9 / 13")
    expect(getFieldGridColumn(embed.fields[3])).toBe("1 / 5")
    expect(getFieldGridColumn(embed.fields[4])).toBe("5 / 9")
    expect(getFieldGridColumn(embed.fields[5])).toBe("9 / 13")
    expect(getFieldGridColumn(embed.fields[6])).toBe("1 / 13")
  })

  it("does not put a non inline field on a row with an inline field", () => {
    const embed = EmbedModel.create({
      fields: [
        { inline: true },
        { inline: true },
        { inline: false },
        { inline: true },
        { inline: true },
      ],
    })

    expect(getFieldGridColumn(embed.fields[0])).toBe("1 / 7")
    expect(getFieldGridColumn(embed.fields[1])).toBe("7 / 13")
    expect(getFieldGridColumn(embed.fields[2])).toBe("1 / 13")
    expect(getFieldGridColumn(embed.fields[3])).toBe("1 / 7")
    expect(getFieldGridColumn(embed.fields[4])).toBe("7 / 13")
  })
})
