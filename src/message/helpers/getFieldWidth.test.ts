import { Embed } from "../classes/Embed"
import { Field } from "../classes/Field"
import { Message } from "../classes/Message"
import { getFieldWidth } from "./getFieldWidth"

describe("getFieldWidth", () => {
  it("returns full width for non inline fields", () => {
    const message = new Message()
    const embed = new Embed(message)
    const first = new Field(embed, { inline: false })
    embed.fields.push(first)

    expect(getFieldWidth(first)).toBe("1 / 13")
  })

  it("returns full width for single inline field", () => {
    const message = new Message()
    const embed = new Embed(message)
    const first = new Field(embed, { inline: true })
    embed.fields.push(first)

    expect(getFieldWidth(first)).toBe("1 / 13")
  })

  it("returns half width for 2 adjacent fields", () => {
    const message = new Message()
    const embed = new Embed(message)
    const first = new Field(embed, { inline: true })
    const second = new Field(embed, { inline: true })
    embed.fields.push(first, second)

    expect(getFieldWidth(first)).toBe("1 / 7")
    expect(getFieldWidth(second)).toBe("7 / 13")
  })

  it("returns third width for 3 adjacent fields", () => {
    const message = new Message()
    const embed = new Embed(message)
    const first = new Field(embed, { inline: true })
    const second = new Field(embed, { inline: true })
    const third = new Field(embed, { inline: true })
    embed.fields.push(first, second, third)

    expect(getFieldWidth(first)).toBe("1 / 5")
    expect(getFieldWidth(second)).toBe("5 / 9")
    expect(getFieldWidth(third)).toBe("9 / 13")
  })

  it("does not put more than 3 fields on one row", () => {
    const message = new Message()
    const embed = new Embed(message)
    const first = new Field(embed, { inline: true })
    const second = new Field(embed, { inline: true })
    const third = new Field(embed, { inline: true })
    const fourth = new Field(embed, { inline: true })
    const fifth = new Field(embed, { inline: true })
    const sixth = new Field(embed, { inline: true })
    const seventh = new Field(embed, { inline: true })
    embed.fields.push(first, second, third, fourth, fifth, sixth, seventh)

    expect(getFieldWidth(first)).toBe("1 / 5")
    expect(getFieldWidth(second)).toBe("5 / 9")
    expect(getFieldWidth(third)).toBe("9 / 13")
    expect(getFieldWidth(fourth)).toBe("1 / 5")
    expect(getFieldWidth(fifth)).toBe("5 / 9")
    expect(getFieldWidth(sixth)).toBe("9 / 13")
    expect(getFieldWidth(seventh)).toBe("1 / 13")
  })

  it("does not put a non inline field on a row with an inline field", () => {
    const message = new Message()
    const embed = new Embed(message)
    const first = new Field(embed, { inline: true })
    const second = new Field(embed, { inline: true })
    const third = new Field(embed, { inline: false })
    const fourth = new Field(embed, { inline: true })
    const fifth = new Field(embed, { inline: true })
    embed.fields.push(first, second, third, fourth, fifth)

    expect(getFieldWidth(first)).toBe("1 / 7")
    expect(getFieldWidth(second)).toBe("7 / 13")
    expect(getFieldWidth(third)).toBe("1 / 13")
    expect(getFieldWidth(fourth)).toBe("1 / 7")
    expect(getFieldWidth(fifth)).toBe("7 / 13")
  })
})
