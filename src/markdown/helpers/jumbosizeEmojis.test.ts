import { jumbosizeEmojis } from "./jumbosizeEmojis"

const array = (size: number) => new Array(size).fill(undefined)

describe("jumbosizeEmojis", () => {
  it("jumbosizes a single emoji", () => {
    expect(jumbosizeEmojis([{ type: "emoji" }])).toEqual([
      { type: "emoji", jumboable: true },
    ])
  })

  it("jumbosizes up to 27 emojis", () => {
    for (let amount = 0; amount <= 27; amount++) {
      expect(
        jumbosizeEmojis(array(amount).map(() => ({ type: "emoji" }))),
      ).toEqual(array(amount).map(() => ({ type: "emoji", jumboable: true })))
    }
  })

  it("does not jumbosize 28 emojis and up", () => {
    expect(jumbosizeEmojis(array(28).map(() => ({ type: "emoji" })))).toEqual(
      array(28).map(() => ({ type: "emoji" })),
    )
  })

  it("does not jumbosize when there are non emoji nodes", () => {
    expect(
      jumbosizeEmojis([
        { type: "emoji" },
        { type: "text", content: "this text prevents jumbosizing" },
      ]),
    ).toEqual([
      { type: "emoji" },
      { type: "text", content: "this text prevents jumbosizing" },
    ])
  })

  it("jumbosizes when there is whitespace only text nodes", () => {
    expect(
      jumbosizeEmojis([
        { type: "emoji" },
        { type: "text", content: " " },
        { type: "emoji" },
      ]),
    ).toEqual([
      { type: "emoji", jumboable: true },
      { type: "text", content: " " },
      { type: "emoji", jumboable: true },
    ])
  })

  it("jumbosizes when there are line breaks", () => {
    expect(
      jumbosizeEmojis([
        { type: "emoji" },
        { type: "br" },
        { type: "emoji" },
        { type: "br" },
        { type: "emoji" },
      ]),
    ).toEqual([
      { type: "emoji", jumboable: true },
      { type: "br" },
      { type: "emoji", jumboable: true },
      { type: "br" },
      { type: "emoji", jumboable: true },
    ])
  })
})
