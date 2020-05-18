import { LANGUAGES } from "./languages"

export const getLanguageFromAlias = (alias: string) => {
  for (const language of LANGUAGES) {
    if (language.name === alias || language.aliases?.includes(alias)) {
      return language
    }
  }
}
