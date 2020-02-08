/* eslint-disable @typescript-eslint/no-unnecessary-condition */
/* eslint-disable import/newline-after-import */

import { getLanguageFromAlias } from "./getLanguageFromAlias"
import { importLanguage } from "./importLanguage"
const hljs = require("highlight.js/lib/highlight") as typeof import("highlight.js")

export const highlightCode = async (languageAlias: string, content: string) => {
  const language = getLanguageFromAlias(languageAlias)

  if (!language) return

  if (!hljs.getLanguage(language.name)) {
    await importLanguage(language.name)
  }

  return hljs.highlight(language.name, content).value
}
