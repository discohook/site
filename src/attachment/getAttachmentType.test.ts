import { getAttachmentType } from "./getAttachmentType"

describe("getAttachmentType", () => {
  it.each<[string, string, string]>([
    ["Amazon Rainforest.jpg", "image/jpeg", "image"],
    ["Recording at 2019-10-29 21-16-47.ogg", "audio/ogg", "audio"],
    ["notes.md", "", "document"],
    ["music_archive.zip", "application/x-zip-compressed", "archive"],
    ["letter.pdf", "application/pdf", "acrobat"],
    ["index.html", "text/html", "webcode"],
    ["no-extension", "", "unknown"],
  ])("resolves an attachment's type (%p, %p -> %p)", (name, mime, type) => {
    expect(getAttachmentType(name, mime)).toEqual(type)
  })
})
