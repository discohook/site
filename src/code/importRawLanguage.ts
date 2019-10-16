import { HLJSStatic, IModeBase } from "highlight.js"

type HLJSLanguage = (hljs?: HLJSStatic) => IModeBase

export const importRawLanguage = async (name: string) => {
  const module = await import(
    /* webpackChunkName: "hljs-[request]" */
    `highlight.js/lib/languages/${name}`
  )

  return module.default as HLJSLanguage
}
