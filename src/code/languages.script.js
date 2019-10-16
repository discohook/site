/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */

// @ts-check
const { get } = require("https")
const hljs = require("highlight.js")

/** @typedef {import("http").IncomingMessage} IncomingMessage */
/** @typedef {import("./languages").Language} Language */

const GITHUB_LANG_BASE =
  "https://raw.githubusercontent.com/highlightjs/highlight.js/master/src/languages"

/** @type {(language: string) => Promise<string[] | undefined>} */
const getDependencies = async language => {
  /** @type {IncomingMessage} */
  const message = await new Promise(resolve =>
    get(`${GITHUB_LANG_BASE}/${language}.js`, resolve),
  )

  let source = ""
  message.on("data", data => (source += data))

  await new Promise(resolve => message.once("end", resolve))

  const requires = source
    .split(/\n|\r/g)
    .find(line => line.startsWith("Requires:"))

  if (!requires) return

  return requires
    .slice("Requires:".length)
    .split(",")
    .map(file => file.trim().replace(".js", ""))
    .sort((a, b) => ((a > b ? 1 : -1)))
}

/** @type {(language: string) => Promise<Language>} */
const getLanguage = async language => {
  const hljsLanguage = hljs.getLanguage(language)

  const aliases = (hljsLanguage.aliases || [])
    .map(alias => alias.toLowerCase())
    .filter(alias => alias !== language)
    .filter((alias, i, a) => a.indexOf(alias) === i)
    .sort((a, b) => ((a > b ? 1 : -1)))

  const dependencies = (await getDependencies(language)) || []

  return {
    name: language,
    aliases: aliases.length === 0 ? undefined : aliases,
    dependencies: dependencies.length === 0 ? undefined : dependencies,
  }
}

const getAllLanguages = async () => {
  const hljsLanguages = hljs.listLanguages().sort((a, b) => (a > b ? 1 : -1))

  /** @type {Language[]} */
  const languages = []

  for (const language of hljsLanguages) {
    // eslint-disable-next-line no-await-in-loop
    languages.push(await getLanguage(language))
  }

  return languages
}

getAllLanguages()
  .then(languages => {
    console.log(JSON.stringify(languages, undefined, 2))
  })
  .catch(error => {
    throw error
  })
