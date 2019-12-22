/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { aliases } from "./aliases"
import { hljs } from "./hljs"
import { importRawLanguage } from "./importRawLanguage"
import { Language } from "./languages"

export const importLanguage = async (lang: string | Language) => {
  const language = typeof lang === "object" ? lang : aliases[lang]
  if (!language) return

  const langPromise = importRawLanguage(language.name)

  if (language.dependencies) {
    const dependencies = language.dependencies.map(importLanguage)
    await Promise.all(dependencies)
  }

  hljs.registerLanguage(language.name, await langPromise)
  if (!SERVER) console.log("Registered highlight.js language:", language.name)
}
