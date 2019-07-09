import { readFileSync } from "fs"
import Koa from "koa"
import conditional from "koa-conditional-get"
import Router from "koa-router"
import serve from "koa-static"
import { resolve } from "path"
import React from "react"
import { renderToNodeStream } from "react-dom/server"
import { Readable, Writable } from "stream"
import App from "./App"

const app = new Koa()
const router = new Router()

const port = 5000

const build = resolve(__dirname, "public")
const html = readFileSync(resolve(build, "index.html")).toString()
const [templateBefore, templateAfter] = html
  .replace('<div id="app"></div>', '<div id="app">{app}</div>')
  .split("{app}")

app.use(conditional())
app.use(serve(build, { defer: true }))

router.get("/", async (context, next) => {
  const readable = new Readable({ read: () => {} })

  context.set("content-type", "text/html")
  context.body = readable

  readable.push(templateBefore)

  await new Promise((res, rej) => {
    const writable = new Writable({
      write: (chunk, encoding, next) => {
        readable.push(chunk, encoding)
        next()
      },
    })

    const stream = renderToNodeStream(<App />)
    stream.pipe(writable)
    stream.once("end", res)
    stream.once("error", rej)
  })

  readable.push(templateAfter)
  readable.push(null)

  return await next()
})

app.use(router.middleware())

app.listen(port, () => console.log(`Listening on ${port}`))
