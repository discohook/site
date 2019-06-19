export type AttachmentIconType =
  | "acrobat"
  | "ae"
  | "ai"
  | "archive"
  | "audio"
  | "code"
  | "document"
  | "image"
  | "photoshop"
  | "sketch"
  | "spreadsheet"
  | "video"
  | "webcode"
  | "unknown"

export interface AttachmentType {
  check: "mime" | "name"
  regex: RegExp
  icon: AttachmentIconType
}

export const attachmentTypes: AttachmentType[] = [
  {
    check: "mime",
    regex: /^image\/vnd.adobe.photoshop/,
    icon: "photoshop",
  },
  {
    check: "mime",
    regex: /^image\/svg\+xml/,
    icon: "webcode",
  },
  {
    check: "mime",
    regex: /^image\/(png|jpeg|gif|webp)/,
    icon: "image",
  },
  {
    check: "mime",
    regex: /^video\//,
    icon: "video",
  },
  {
    check: "name",
    regex: /\.pdf$/,
    icon: "acrobat",
  },
  {
    check: "name",
    regex: /\.ae/,
    icon: "ae",
  },
  {
    check: "name",
    regex: /\.sketch$/,
    icon: "sketch",
  },
  {
    check: "name",
    regex: /\.ai$/,
    icon: "ai",
  },
  {
    check: "name",
    regex: /\.(?:rar|zip|7z|tar|tar\\.gz)$/,
    icon: "archive",
  },
  {
    check: "name",
    regex: /\.(?:c\+\+|cpp|cc|c|h|hpp|mm|m|json|js|rb|rake|py|asm|fs|pyc|dtd|cgi|bat|rss|java|graphml|idb|lua|o|gml|prl|sls|conf|cmake|make|sln|vbe|cxx|wbf|vbs|r|wml|php|bash|applescript|fcgi|yaml|ex|exs|sh|ml|actionscript)$/,
    icon: "code",
  },
  {
    check: "name",
    regex: /\.(?:txt|rtf|doc|docx|md|pages|ppt|pptx|pptm|key|log)$/,
    icon: "document",
  },
  {
    check: "name",
    regex: /\.(?:xls|xlsx|numbers|csv)$/,
    icon: "spreadsheet",
  },
  {
    check: "name",
    regex: /\.(?:html|xhtml|htm|js|xml|xls|xsd|css|styl)$/,
    icon: "webcode",
  },
  {
    check: "name",
    regex: /\.(?:mp3|ogg|wav|flac)$/,
    icon: "audio",
  },
  {
    check: "mime",
    regex: /.*/,
    icon: "unknown",
  },
]
