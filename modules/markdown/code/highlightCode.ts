/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import hljs from "highlight.js/lib/core"
import { getLanguageFromAlias } from "./getLanguageFromAlias"
import { importLanguage } from "./importLanguage"

export const highlightCode = async (languageAlias: string, content: string) => {
  const language = getLanguageFromAlias(languageAlias)
  if (!language) return

  if (!hljs.getLanguage(language.name)) {
    await importLanguage(language.name)
  }

  return hljs.highlight(language.name, content).value
}
