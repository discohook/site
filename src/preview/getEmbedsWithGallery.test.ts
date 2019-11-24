import { id } from "../message/uid"
import { getEmbedsWithGallery } from "./getEmbedsWithGallery"

describe("getEmbedsWithGallery", () => {
  it("does not return a gallery given no images", () => {
    expect(getEmbedsWithGallery([{ [id]: 1, title: "Nice embed" }])).toEqual([
      { [id]: 1, title: "Nice embed" },
    ])
  })

  it("does not return a gallery given no adjacent embeds", () => {
    expect(
      getEmbedsWithGallery([
        {
          [id]: 1,
          title: "Cool embed with an image",
          url: "https://example.com/",
          image: { url: "https://example.com/image-1.png" },
        },
      ]),
    ).toEqual([
      {
        [id]: 1,
        title: "Cool embed with an image",
        url: "https://example.com/",
        image: { url: "https://example.com/image-1.png" },
      },
    ])
  })

  it("returns a gallery given adjacent embeds", () => {
    expect(
      getEmbedsWithGallery([
        {
          [id]: 1,
          title: "Cool embed with images",
          url: "https://example.com/",
          image: { url: "https://example.com/image-1.png" },
        },
        {
          [id]: 2,
          url: "https://example.com/",
          image: { url: "https://example.com/image-2.png" },
        },
      ]),
    ).toEqual([
      {
        [id]: 1,
        title: "Cool embed with images",
        url: "https://example.com/",
        image: { url: "https://example.com/image-1.png" },
        gallery: [
          { url: "https://example.com/image-1.png", [id]: 1 },
          { url: "https://example.com/image-2.png", [id]: 2 },
        ],
      },
    ])
  })

  it("does not return a gallery bigger than 4 items", () => {
    expect(
      getEmbedsWithGallery([
        { [id]: 1, url: "https://example.com/", image: { url: "/image1.png" } },
        { [id]: 2, url: "https://example.com/", image: { url: "/image2.png" } },
        { [id]: 3, url: "https://example.com/", image: { url: "/image3.png" } },
        { [id]: 4, url: "https://example.com/", image: { url: "/image4.png" } },
      ]),
    ).toEqual([
      {
        [id]: 1,
        url: "https://example.com/",
        image: { url: "/image1.png" },
        gallery: [
          { url: "/image1.png", [id]: 1 },
          { url: "/image2.png", [id]: 2 },
          { url: "/image3.png", [id]: 3 },
          { url: "/image4.png", [id]: 4 },
        ],
      },
    ])

    expect(
      getEmbedsWithGallery([
        { [id]: 1, url: "https://example.com/", image: { url: "/image1.png" } },
        { [id]: 2, url: "https://example.com/", image: { url: "/image2.png" } },
        { [id]: 3, url: "https://example.com/", image: { url: "/image3.png" } },
        { [id]: 4, url: "https://example.com/", image: { url: "/image4.png" } },
        { [id]: 5, url: "https://example.com/", image: { url: "/image5.png" } },
      ]),
    ).toEqual([
      {
        [id]: 1,
        url: "https://example.com/",
        image: { url: "/image1.png" },
        gallery: [
          { url: "/image1.png", [id]: 1 },
          { url: "/image2.png", [id]: 2 },
          { url: "/image3.png", [id]: 3 },
          { url: "/image4.png", [id]: 4 },
        ],
      },
    ])
  })

  it("does not combine galleries when urls are different", () => {
    expect(
      getEmbedsWithGallery([
        {
          [id]: 1,
          title: "Cool embed with images",
          url: "https://example.com/page-1/",
          image: { url: "https://example.com/image-1.png" },
        },
        {
          [id]: 2,
          title: "Completely different embed with images",
          url: "https://example.com/page-2/",
          image: { url: "https://example.com/image-2.png" },
        },
      ]),
    ).toEqual([
      {
        [id]: 1,
        title: "Cool embed with images",
        url: "https://example.com/page-1/",
        image: { url: "https://example.com/image-1.png" },
      },
      {
        [id]: 2,
        title: "Completely different embed with images",
        url: "https://example.com/page-2/",
        image: { url: "https://example.com/image-2.png" },
      },
    ])
  })

  it("does not combine galleries when no url is present", () => {
    expect(
      getEmbedsWithGallery([
        {
          [id]: 1,
          title: "Cool embed with images",
          image: { url: "https://example.com/image-1.png" },
        },
        {
          [id]: 2,
          title: "Completely different embed with images",
          image: { url: "https://example.com/image-2.png" },
        },
      ]),
    ).toEqual([
      {
        [id]: 1,
        title: "Cool embed with images",
        image: { url: "https://example.com/image-1.png" },
      },
      {
        [id]: 2,
        title: "Completely different embed with images",
        image: { url: "https://example.com/image-2.png" },
      },
    ])
  })

  it("skips embed when there is no image", () => {
    expect(
      getEmbedsWithGallery([
        { [id]: 1, url: "https://example.com/", image: { url: "/image1.png" } },
        { [id]: 2, url: "https://example.com/", image: { url: "/image2.png" } },
        { [id]: 3, url: "https://example.com/" },
        { [id]: 4, url: "https://example.com/", image: { url: "/image4.png" } },
        { [id]: 5, url: "https://example.com/", image: { url: "/image5.png" } },
      ]),
    ).toEqual([
      {
        [id]: 1,
        url: "https://example.com/",
        image: { url: "/image1.png" },
        gallery: [
          { url: "/image1.png", [id]: 1 },
          { url: "/image2.png", [id]: 2 },
          { url: "/image4.png", [id]: 4 },
          { url: "/image5.png", [id]: 5 },
        ],
      },
    ])
  })

  it("does not return a gallery given an adjacent embed with no image", () => {
    expect(
      getEmbedsWithGallery([
        {
          [id]: 1,
          title: "Cool embed with an image",
          url: "https://example.com/",
          image: { url: "https://example.com/image-1.png" },
        },
        {
          [id]: 2,
          url: "https://example.com/",
        },
      ]),
    ).toEqual([
      {
        [id]: 1,
        title: "Cool embed with an image",
        url: "https://example.com/",
        image: { url: "https://example.com/image-1.png" },
      },
    ])
  })

  it("returns a gallery a first embed without an image", () => {
    expect(
      getEmbedsWithGallery([
        {
          [id]: 1,
          title: "Cool embed with images",
          url: "https://example.com/",
        },
        {
          [id]: 2,
          url: "https://example.com/",
          image: { url: "https://example.com/image-2.png" },
        },
      ]),
    ).toEqual([
      {
        [id]: 1,
        title: "Cool embed with images",
        url: "https://example.com/",
        gallery: [{ url: "https://example.com/image-2.png", [id]: 2 }],
      },
    ])
  })
})
