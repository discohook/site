import { HLJSStatic, IModeBase } from "highlight.js"

type HLJSLanguage = (hljs?: HLJSStatic) => IModeBase

export const importRawLanguage = async (name: string) => {
  const module = await import(
    `highlight.js/lib/languages/${name}`
    /* webpackChunkName: "hljs-[request]" */
  )

  return module.default as HLJSLanguage
}
