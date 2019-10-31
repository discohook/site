// eslint-disable-next-line @typescript-eslint/no-var-requires
const hljsInternal = require("highlight.js/lib/highlight")

export const hljs = hljsInternal as typeof import("highlight.js")
