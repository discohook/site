import { Embed } from "../classes/Embed"
import { Message } from "../classes/Message"
import { getEmbedGallery } from "./getEmbedGallery"

describe("getEmbedGallery", () => {
  it("does not return a gallery given no images", () => {
    const message = new Message()
    const embed = new Embed(message, { title: "Nice embed" })
    message.embeds.push(embed)

    expect(getEmbedGallery(embed)).toBeUndefined()
  })

  it("does not return a gallery given no adjacent embeds", () => {
    const message = new Message()
    const embed = new Embed(message, {
      title: "Cool embed with an image",
      url: "https://example.com/",
      image: { url: "https://example.com/image-1.png" },
    })
    message.embeds.push(embed)

    expect(getEmbedGallery(embed)).toBeUndefined()
  })

  it("returns a gallery given adjacent embeds", () => {
    const message = new Message()
    const first = new Embed(message, {
      title: "Cool embed with images",
      url: "https://example.com/",
      image: { url: "https://example.com/image-1.png" },
    })
    const second = new Embed(message, {
      url: "https://example.com/",
      image: { url: "https://example.com/image-2.png" },
    })
    message.embeds.push(first, second)

    expect(getEmbedGallery(first)).toEqual([
      { id: expect.any(Number), image: "https://example.com/image-1.png" },
      { id: expect.any(Number), image: "https://example.com/image-2.png" },
    ])
  })

  it("does not return a gallery bigger than 4 items", () => {
    const message = new Message()
    const first = new Embed(message, {
      title: "Cool embed with image",
      url: "https://example.com/",
      image: { url: "https://example.com/image-1.png" },
    })
    const second = new Embed(message, {
      title: "Another cool embed",
      url: "https://example.com/",
      image: { url: "https://example.com/image-2.png" },
    })
    const third = new Embed(message, {
      title: "Another cool embed",
      url: "https://example.com/",
      image: { url: "https://example.com/image-3.png" },
    })
    const fourth = new Embed(message, {
      title: "Another cool embed",
      url: "https://example.com/",
      image: { url: "https://example.com/image-4.png" },
    })
    const fifth = new Embed(message, {
      title: "Another cool embed",
      url: "https://example.com/",
      image: { url: "https://example.com/image-5.png" },
    })
    message.embeds.push(first, second, third, fourth, fifth)

    expect(getEmbedGallery(first)).toEqual([
      { id: expect.any(Number), image: "https://example.com/image-1.png" },
      { id: expect.any(Number), image: "https://example.com/image-2.png" },
      { id: expect.any(Number), image: "https://example.com/image-3.png" },
      { id: expect.any(Number), image: "https://example.com/image-4.png" },
    ])
  })

  it("does not combine galleries when urls are different", () => {
    const message = new Message()
    const first = new Embed(message, {
      title: "Cool embed with image",
      url: "https://example.com/page-1/",
      image: { url: "https://example.com/image-1.png" },
    })
    const second = new Embed(message, {
      title: "Another cool embed",
      url: "https://example.com/page-2/",
      image: { url: "https://example.com/image-2.png" },
    })
    message.embeds.push(first, second)

    expect(getEmbedGallery(first)).toBeUndefined()
  })

  it("does not combine galleries when no url is present", () => {
    const message = new Message()
    const first = new Embed(message, {
      title: "Cool embed with image",
      image: { url: "https://example.com/image-1.png" },
    })
    const second = new Embed(message, {
      title: "Another cool embed",
      image: { url: "https://example.com/image-2.png" },
    })
    message.embeds.push(first, second)

    expect(getEmbedGallery(first)).toBeUndefined()
  })

  it("skips embed when there is no image", () => {
    const message = new Message()
    const first = new Embed(message, {
      title: "Cool embed with image",
      url: "https://example.com/",
      image: { url: "https://example.com/image-1.png" },
    })
    const second = new Embed(message, {
      title: "Another cool embed",
      url: "https://example.com/",
      image: { url: "https://example.com/image-2.png" },
    })
    const third = new Embed(message, {
      title: "Another cool embed",
      url: "https://example.com/",
    })
    const fourth = new Embed(message, {
      title: "Another cool embed",
      url: "https://example.com/",
      image: { url: "https://example.com/image-4.png" },
    })
    message.embeds.push(first, second, third, fourth)

    expect(getEmbedGallery(first)).toEqual([
      { id: expect.any(Number), image: "https://example.com/image-1.png" },
      { id: expect.any(Number), image: "https://example.com/image-2.png" },
      { id: expect.any(Number), image: "https://example.com/image-4.png" },
    ])
  })

  it("does not return a gallery given an adjacent embed with no image", () => {
    const message = new Message()
    const first = new Embed(message, {
      title: "Cool embed with image",
      url: "https://example.com/",
      image: { url: "https://example.com/image-1.png" },
    })
    const second = new Embed(message, {
      url: "https://example.com/",
    })
    message.embeds.push(first, second)

    expect(getEmbedGallery(first)).toBeUndefined()
  })

  it("returns a gallery when the first embed does not have an image", () => {
    const message = new Message()
    const first = new Embed(message, {
      title: "Cool embed with image",
      url: "https://example.com/",
    })
    const second = new Embed(message, {
      url: "https://example.com/",
      image: { url: "https://example.com/image.png" },
    })
    message.embeds.push(first, second)

    expect(getEmbedGallery(first)).toEqual([
      { id: expect.any(Number), image: "https://example.com/image.png" },
    ])
  })

  it("does not return a gallery when a previous embed owns the gallery", () => {
    const message = new Message()
    const first = new Embed(message, {
      title: "Cool embed with images",
      url: "https://example.com/",
      image: { url: "https://example.com/image-1.png" },
    })
    const second = new Embed(message, {
      url: "https://example.com/",
      image: { url: "https://example.com/image-2.png" },
    })
    message.embeds.push(first, second)

    expect(getEmbedGallery(second)).toBeUndefined()
  })
})
