import Router from "@koa/router"
import { readFileSync } from "fs"
import isBot from "isbot"
import Koa from "koa"
import conditional from "koa-conditional-get"
import serve from "koa-static"
import { resolve } from "path"
import React from "react"
import { renderToNodeStream } from "react-dom/server"
import { Transform } from "stream"
import { createDeflate, createGzip } from "zlib"
import App from "./App"
import { RequestProvider } from "./RequestContext"

const app = new Koa()
const router = new Router()

const port = 5000

const build = resolve(__dirname, "public")
const html = readFileSync(resolve(build, "index.html")).toString()
const [templateStart, templateEnd] = html
  .replace('<div id="app"></div>', '<div id="app">{app}</div>')
  .split("{app}")
const [templateStartBots, templateEndBots] = html
  .replace(/<script src="[^"]*"><\/script>/g, "<!-- $& -->")
  .replace(/<link [^>]* rel="preload">/g, "<!-- $& -->")
  .replace('<div id="app"></div>', '<div id="app">{app}</div>')
  .split("{app}")

const encodings = {
  gzip: createGzip,
  deflate: createDeflate,
  identity: () => new Transform({ transform: (data, _, fn) => fn(null, data) }),
} as const

app.use(conditional())
app.use(serve(build, { defer: true }))

router.get("/", async (context, next) => {
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
    const nodeStream = renderToNodeStream(
      <RequestProvider value={context}>
        <App />
      </RequestProvider>,
    )

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

app.use(router.middleware())

app.on("error", error => {
  if (["ECONNRESET", "EPIPE"].includes(error.code)) return

  console.error(error)
})

app.listen(process.env.PORT, () => {
  console.log(`Listening on ${port}`)
})
