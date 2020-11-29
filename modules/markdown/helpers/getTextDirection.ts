const LTR_CHARS = [
  "A-Z",
  "a-z",
  "\u00c0-\u00d6",
  "\u00d8-\u00f6",
  "\u00f8-\u02b8",
  "\u0300-\u0590",
  "\u0800-\u1fff",
  "\u200e-\ufb1c",
  "\ufe00-\ufe6f",
  "\ufefd-\uffff",
].join("")

const RTL_CHARS = ["\u0591-\u07ff", "\ufb1d-\ufdfd", "\ufe70-\ufefc"].join("")

const LTR_RE = new RegExp(`^[^${RTL_CHARS}]*[${LTR_CHARS}]`)
const RTL_RE = new RegExp(`^[^${LTR_CHARS}]*[${RTL_CHARS}]`)

export const getTextDirection = (text: string) => {
  if (LTR_RE.test(text)) return "ltr"
  if (RTL_RE.test(text)) return "rtl"
  return "neutral"
}
