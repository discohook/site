import languages from "./languages.json"

const hljs: typeof import("highlight.js") = require("highlight.js/lib/highlight")

const aliasToName: Record<string, keyof typeof languages> = {}
for (const [name, language] of Object.entries(languages)) {
  for (const alias of language.aliases) {
    aliasToName[alias] = name as keyof typeof languages
  }
}

const importLanguage = async (language: string) => {
  const lang = languages[aliasToName[language]]

  if (lang.dependencies)
    await Promise.all(lang.dependencies.map(importLanguage))

  const { default: importedLanguage } = await import(
    "highlight.js/lib/languages/" + aliasToName[language]
  )

  hljs.registerLanguage(language, importedLanguage)

  console.log("Registered highlight.js language:", language)
}

export const highlight = async (language: string, content: string) => {
  if (!aliasToName[language]) return null
  if (hljs.getLanguage(language)) return hljs.highlight(language, content)

  await importLanguage(language)
  return hljs.highlight(language, content)
}
