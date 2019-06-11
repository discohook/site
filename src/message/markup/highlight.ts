const hljs: typeof import("highlight.js") = require("highlight.js/lib/highlight")
const languages: Record<string, Language> = require("./languages.json")

interface Language {
  aliases?: string[]
  dependencies?: string[]
}

const aliases: Record<string, string> = {}
for (const [name, language] of Object.entries(languages)) {
  aliases[name] = name
  for (const alias of language.aliases || []) aliases[alias] = name
}

const importLanguage = async (language: string) => {
  const lang = languages[aliases[language]]

  if (lang.dependencies)
    await Promise.all(lang.dependencies.map(importLanguage))

  const hl = await import(`highlight.js/lib/languages/${aliases[language]}.js`)
  hljs.registerLanguage(language, hl.default)

  console.log("Registered highlight.js language:", aliases[language])
}

export const highlight = async (language: string, content: string) => {
  if (!aliases[language]) return null
  if (hljs.getLanguage(language)) return hljs.highlight(language, content)

  await importLanguage(language)
  return hljs.highlight(language, content)
}
