import hljs from "highlight.js/lib/core"
import { getLanguageFromAlias } from "./getLanguageFromAlias"

const importRawLanguage = async (name: string) =>
  import(`highlight.js/lib/languages/${name}`).then(
    module => module.default as (hljs?: HLJSApi) => LanguageDetail,
  )

export const importLanguage = async (alias: string) => {
  const language = getLanguageFromAlias(alias)
  if (!language) return

  console.log(language)

  if (language.dependencies) {
    await Promise.all(
      language.dependencies.map(async dependency => {
        await importLanguage(dependency)
      }),
    )
  }

  hljs.registerLanguage(language.name, await importRawLanguage(language.name))

  if (typeof window !== "undefined") {
    console.log("Registered highlight.js language:", language.name)
  }
}
