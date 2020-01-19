import Router from "@koa/router"
import { readFileSync } from "fs"
import "highlight.js"
import isBot from "isbot"
import Koa from "koa"
import conditional from "koa-conditional-get"
import serve from "koa-static"
import { resolve } from "path"
import React from "react"
import { renderToNodeStream } from "react-dom/server"
import { Transform } from "stream"
import { ServerStyleSheet } from "styled-components"
import { createDeflate, createGzip } from "zlib"
import { resetLastId } from "../message/uid"
import App from "./App"

Object.assign(global, {
  ENV: process.env.NODE_ENV ?? "production",
  PROD: process.env.NODE_ENV === "production",
  DEV: process.env.NODE_ENV === "development",
  TEST: process.env.NODE_ENV === "test",
  SERVER: true,
})

const app = new Koa()
const router = new Router()

const build = resolve(__dirname, "../../dist")
const html = readFileSync(resolve(build, "index.html")).toString()
const [templateStart, templateEnd] = html
  .replace('<div id="app"></div>', '<div id="app">{app}</div>')
  .split("{app}")
const [templateStartBots, templateEndBots] = html
  .replace(/<script type="[^"]*" src="[^"]*"><\/script>/g, "<!-- $& -->")
  .replace(/<link [^>]* rel="preload">/g, "<!-- $& -->")
  .replace('<div id="app"></div>', '<div id="app">{app}</div>')
  .split("{app}")

const encodings = {
  gzip: createGzip,
  deflate: createDeflate,
  identity: () =>
    new Transform({ transform: (chunk, _, fn) => fn(null, chunk) }),
} as const

app.use(conditional())
app.use(serve(build, { defer: true }))

router.get("/", async (context, next) => {
  resetLastId()

  context.set("Content-Type", "text/html; charset=utf-8")

  const encoding = context.acceptsEncodings(Object.keys(encodings)) as
    | keyof typeof encodings
    | false

  if (encoding === false) return context.throw(406)
  context.set("Content-Encoding", encoding)

  const stream = encodings[encoding]()
  context.body = stream

  if (isBot(context.get("User-Agent"))) {
    stream.write(templateStartBots)
  } else {
    stream.write(templateStart)
  }

  await new Promise((resolve, reject) => {
    const sheet = new ServerStyleSheet()
    const jsx = sheet.collectStyles(<App request={context} />)
    const nodeStream = sheet.interleaveWithNodeStream(renderToNodeStream(jsx))

    nodeStream.on("data", chunk => stream.write(chunk))
    nodeStream.once("end", resolve)
    nodeStream.once("error", reject)
  })

  if (isBot(context.get("User-Agent"))) {
    stream.write(templateEndBots)
  } else {
    stream.write(templateEnd)
  }

  stream.end()

  return next()
})

router.redirect("/discord", "https://discord.gg/84HGwPZ", 302)

app.use(router.middleware())

app.on("error", error => {
  if (["ECONNRESET", "EPIPE"].includes(error.code)) return

  console.error(error)
})

const port = Number(process.env.PORT) || 5000
app.listen(port, () => {
  console.log(`Listening on ${port}`)
})
