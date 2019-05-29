const hljs: typeof import("highlight.js") = require("highlight.js/lib/highlight")
const languages: Record<string, Language> = require("./languages.json")

type Language = string[] | { aliases?: string[]; dependencies?: string[] }

const aliasToName: Record<string, string> = {}
for (const [name, language] of Object.entries(languages)) {
  aliasToName[name] = name

  const aliases = Array.isArray(language) ? language : language.aliases || []
  for (const alias of aliases) aliasToName[alias] = name
}

const importLanguage = async (language: string) => {
  const lang = languages[aliasToName[language]]

  if (!Array.isArray(lang) && lang.dependencies)
    await Promise.all(lang.dependencies.map(importLanguage))

  const { default: importedLanguage } = await import(
    `highlight.js/lib/languages/${aliasToName[language]}.js`
  )

  hljs.registerLanguage(language, importedLanguage)

  console.log("Registered highlight.js language:", aliasToName[language])
}

export const highlight = async (language: string, content: string) => {
  if (!aliasToName[language]) return null
  if (hljs.getLanguage(language)) return hljs.highlight(language, content)

  await importLanguage(language)
  return hljs.highlight(language, content)
}
