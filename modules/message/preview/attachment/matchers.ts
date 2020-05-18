import type { AttachmentType } from "./AttachmentType"

export type AttachmentTypeMatcher = {
  check: "mime" | "name"
  regex: RegExp
  type: AttachmentType
}

export const ATTACHMENT_TYPE_MATCHERS: AttachmentTypeMatcher[] = [
  {
    check: "mime",
    regex: /^image\/vnd.adobe.photoshop/,
    type: "photoshop",
  },
  {
    check: "mime",
    regex: /^image\/svg\+xml/,
    type: "webcode",
  },
  {
    check: "mime",
    regex: /^image\//,
    type: "image",
  },
  {
    check: "mime",
    regex: /^video\//,
    type: "video",
  },
  {
    check: "name",
    regex: /\.pdf$/,
    type: "acrobat",
  },
  {
    check: "name",
    regex: /\.ae/,
    type: "ae",
  },
  {
    check: "name",
    regex: /\.sketch$/,
    type: "sketch",
  },
  {
    check: "name",
    regex: /\.ai$/,
    type: "ai",
  },
  {
    check: "name",
    regex: /\.(?:rar|zip|7z|tar|tar\.gz)$/,
    type: "archive",
  },
  {
    check: "name",
    regex: /\.(?:c\+\+|cpp|cc|c|h|hpp|mm|m|json|js|rb|rake|py|asm|fs|pyc|dtd|cgi|bat|rss|java|graphml|idb|lua|o|gml|prl|sls|conf|cmake|make|sln|vbe|cxx|wbf|vbs|r|wml|php|bash|applescript|fcgi|yaml|ex|exs|sh|ml|actionscript)$/,
    type: "code",
  },
  {
    check: "name",
    regex: /\.(?:txt|rtf|doc|docx|md|pages|ppt|pptx|pptm|key|log)$/,
    type: "document",
  },
  {
    check: "name",
    regex: /\.(?:xls|xlsx|numbers|csv)$/,
    type: "spreadsheet",
  },
  {
    check: "name",
    regex: /\.(?:html|xhtml|htm|js|xml|xls|xsd|css|styl)$/,
    type: "webcode",
  },
  {
    check: "name",
    regex: /\.(?:mp3|ogg|wav|flac)$/,
    type: "audio",
  },
]
