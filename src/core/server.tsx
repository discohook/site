import Router from "@koa/router"
import { readFileSync } from "fs"
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
const [templateBefore, templateAfter] = html
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

  stream.write(templateBefore)

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

  stream.write(templateAfter)
  stream.end()

  return next()
})

app.use(router.middleware())

app.on("error", error => {
  if (error.code === "ECONNRESET") return

  console.error(error)
})

app.listen(port, () => console.log(`Listening on ${port}`))
