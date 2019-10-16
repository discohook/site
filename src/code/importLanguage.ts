import { aliases } from "./aliases"
import { hljs } from "./hljs"
import { importRawLanguage } from "./importRawLanguage"

export const importLanguage = async (name: string) => {
  const language = aliases[name]
  if (!language) return

  const langPromise = importRawLanguage(language.name)

  if (language.dependencies) {
    const dependencies = language.dependencies.map(async d => importLanguage(d))
    await Promise.all(dependencies)
  }

  hljs.registerLanguage(language.name, await langPromise)
  console.log("Registered highlight.js language:", language.name)
}
