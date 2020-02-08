import { getAttachmentType } from "./getAttachmentType"

const attachments = [
  {
    name: "Amazon Rainforest.jpg",
    mime: "image/jpeg",
    type: "image",
  },
  {
    name: "Recording at 2019-10-29 21-16-47.ogg",
    mime: "audio/ogg",
    type: "audio",
  },
  {
    name: "notes.md",
    mime: "",
    type: "document",
  },
  {
    name: "music_archive.zip",
    mime: "application/x-zip-compressed",
    type: "archive",
  },
  {
    name: "letter.pdf",
    mime: "application/pdf",
    type: "acrobat",
  },
  {
    name: "index.html",
    mime: "text/html",
    type: "webcode",
  },
  {
    name: "no-extension",
    mime: "",
    type: "unknown",
  },
]

describe("getAttachmentType", () => {
  it("resolves an attachment's type", () => {
    for (const { name, mime, type } of attachments) {
      expect(getAttachmentType(name, mime)).toEqual(type)
    }
  })
})
