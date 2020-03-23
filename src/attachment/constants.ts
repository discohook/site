import { acrobat } from "./icons/acrobat"
import { ae } from "./icons/ae"
import { ai } from "./icons/ai"
import { archive } from "./icons/archive"
import { audio } from "./icons/audio"
import { code } from "./icons/code"
import { document } from "./icons/document"
import { photoshop } from "./icons/photoshop"
import { sketch } from "./icons/sketch"
import { spreadsheet } from "./icons/spreadsheet"
import { unknown } from "./icons/unknown"
import { video } from "./icons/video"
import { webcode } from "./icons/webcode"
import type { AttachmentType } from "./types/AttachmentType"
import type { AttachmentTypeMatcher } from "./types/AttachmentTypeMatcher"

export const ATTACHMENT_ICONS: Record<AttachmentType, JSX.Element> = {
  acrobat,
  ae,
  ai,
  archive,
  audio,
  code,
  document,
  image: unknown,
  photoshop,
  sketch,
  spreadsheet,
  unknown,
  video,
  webcode,
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
