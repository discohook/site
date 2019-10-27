/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { aliases } from "./aliases"
import { hljs } from "./hljs"
import { importLanguage } from "./importLanguage"

export const highlightCode = async (language: string, content: string) => {
  if (!aliases[language]) return

  if (!hljs.getLanguage(language)) {
    await importLanguage(language)
  }

  return hljs.highlight(language, content).value
}
