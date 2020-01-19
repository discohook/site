// @ts-check
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */

const hljs = require("highlight.js")
const { get } = require("https")

/** @typedef {import("http").IncomingMessage} IncomingMessage */
/** @typedef {import("./languages").Language} Language */

const HLJS_GIT_RAW_LANGUAGES_BASE_URL =
  "https://raw.githubusercontent.com/highlightjs/highlight.js/master/src/languages"

/** @type {(language: string) => Promise<string[] | undefined>} */
async function getDependencies(language) {
  /** @type {IncomingMessage} */
  const message = await new Promise(resolve =>
    get(`${HLJS_GIT_RAW_LANGUAGES_BASE_URL}/${language}.js`, resolve),
  )

  let source = ""
  message.on("data", chunk => (source += chunk))

  await new Promise(resolve => message.once("end", resolve))

  const requires = source
    .split(/\n|\r/g)
    .find(line => line.startsWith("Requires:"))

  if (!requires) return

  return requires
    .slice("Requires:".length)
    .split(",")
    .map(file => file.trim().replace(".js", ""))
    .sort((first, second) => ((first > second ? 1 : -1)))
}

/** @type {(language: string) => Promise<Language>} */
async function getLanguage(language) {
  const hljsLanguage = hljs.getLanguage(language)

  const aliases = (hljsLanguage.aliases || [])
    .map(alias => alias.toLowerCase())
    .filter(alias => alias !== language)
    .filter((alias, index, array) => array.indexOf(alias) === index)
    .sort((first, second) => ((first > second ? 1 : -1)))

  const dependencies = (await getDependencies(language)) || []

  return {
    name: language,
    aliases: aliases.length === 0 ? undefined : aliases,
    dependencies: dependencies.length === 0 ? undefined : dependencies,
  }
}

/** @type {() => Generator<Promise<Language>>} */
function* getAllLanguages() {
  const languages = hljs
    .listLanguages()
    .sort((first, second) => ((first > second ? 1 : -1)))

  for (const language of languages) {
    // eslint-disable-next-line no-await-in-loop
    yield getLanguage(language)
  }
}

async function main() {
  console.log("[")
  for await (const { name, aliases, dependencies } of getAllLanguages()) {
    console.log("  {")
    console.log(`    name: "${name}",`)
    if (aliases) {
      console.log(`    aliases: ["${aliases.join('", "')}"],`)
    }
    if (dependencies) {
      console.log(`    dependencies: ["${dependencies.join('", "')}"],`)
    }
    console.log("  },")
  }
  console.log("]")
}

main().catch(error => {
  console.error(error)
})
