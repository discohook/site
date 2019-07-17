import { readFileSync } from "fs"
import Koa from "koa"
import conditional from "koa-conditional-get"
import Router from "koa-router"
import serve from "koa-static"
import { resolve } from "path"
import React from "react"
import { renderToNodeStream } from "react-dom/server"
import { Transform } from "stream"
import { createDeflate, createGzip } from "zlib"
import App from "./App"

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
  identity: () => new Transform({ transform: (data, _, cb) => cb(null, data) }),
} as const

app.use(conditional())
app.use(serve(build, { defer: true }))

router.get("/", async (context, next) => {
  context.set("content-type", "text/html")

  const encoding = context.acceptsEncodings(Object.keys(encodings)) as
    | keyof typeof encodings
    | false

  if (typeof encoding === "boolean") return context.throw(406)
  if (encoding !== "identity") context.set("content-encoding", encoding)

  const stream = encodings[encoding]()
  context.body = stream

  stream.write(templateBefore)

  await new Promise((res, rej) => {
    const nodeStream = renderToNodeStream(<App requestContext={context} />)
    nodeStream.on("data", chunk => stream.write(chunk))
    nodeStream.once("end", res)
    nodeStream.once("error", rej)
  })

  stream.write(templateAfter)
  stream.end()

  return await next()
})

app.use(router.middleware())

app.on("error", () => {})

app.listen(port, () => console.log(`Listening on ${port}`))
