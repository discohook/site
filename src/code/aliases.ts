import { Language, languages } from "./languages"

export const aliases: Record<string, Language> = {}

for (const language of languages) {
  aliases[language.name] = language

  for (const alias of language.aliases || []) {
    aliases[alias] = language
  }
}
