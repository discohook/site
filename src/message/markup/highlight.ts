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

const importLanguage = async (name: string) => {
  const lang = languages[aliases[name]]

  if (lang.dependencies)
    await Promise.all(lang.dependencies.map(importLanguage))

  const { default: language } = await import(
    `highlight.js/lib/languages/${aliases[name]}`
    /* webpackChunkName: "hljs-[request]" */
  )
  hljs.registerLanguage(name, language)

  console.log("Registered highlight.js language:", aliases[name])
}

export const highlight = async (language: string, content: string) => {
  if (!aliases[language]) return null
  if (hljs.getLanguage(language)) return hljs.highlight(language, content)

  await importLanguage(language)
  return hljs.highlight(language, content)
}
