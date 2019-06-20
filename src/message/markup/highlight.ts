const hljs: typeof import("highlight.js") = require("highlight.js/lib/highlight")
import { languages } from "./languages"

const aliases: Record<string, string> = {}
for (const language of languages) {
  const name = language.aliases[0]
  aliases[name] = name
  for (const alias of language.aliases) aliases[alias] = name
}

const importLanguage = async (name: string) => {
  const lang = languages.find((lang) => lang.aliases.includes(name))
  if (!lang) return

  const languagesToImport = [...(lang.dependencies || []), aliases[name]]
  const hljsLanguages = await Promise.all(
    languagesToImport.map((name) =>
      import(
        /* webpackChunkName: "hljs-[request]" */
        `highlight.js/lib/languages/${name}`
      ),
    ),
  )

  for (const [index, { default: language }] of Object.entries(hljsLanguages)) {
    const name = languagesToImport[Number(index)]
    hljs.registerLanguage(name, language)
    console.log("Registered highlight.js language:", name)
  }
}

export const highlight = async (language: string, content: string) => {
  if (!aliases[language]) return null
  if (hljs.getLanguage(language)) return hljs.highlight(language, content)

  await importLanguage(language)
  return hljs.highlight(language, content)
}
