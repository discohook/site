import type { AttachmentType } from "./AttachmentType"
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
