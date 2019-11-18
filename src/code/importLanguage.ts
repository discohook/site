/* eslint-disable @typescript-eslint/no-unnecessary-condition */

import { SERVER } from "../core/environment"
import { aliases } from "./aliases"
import { hljs } from "./hljs"
import { importRawLanguage } from "./importRawLanguage"

export const importLanguage = async (name: string) => {
  const language = aliases[name]
  if (!language) return

  const langPromise = importRawLanguage(language.name)

  if (language.dependencies) {
    const dependencies = language.dependencies.map(async dependency =>
      importLanguage(dependency),
    )
    await Promise.all(dependencies)
  }

  hljs.registerLanguage(language.name, await langPromise)
  if (!SERVER) console.log("Registered highlight.js language:", language.name)
}
