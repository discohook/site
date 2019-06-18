import { readFileSync } from "fs"
import Koa from "koa"
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

const build = resolve(__dirname, "..", "build")
const html = readFileSync(resolve(build, "index.html")).toString()

const [templateBefore, templateAfter] = html
  .replace('<div id="app"></div>', '<div id="app"><!--APP--></div>')
  .split("<!--APP-->")

router.get("/", async (context) => {
  const readable = new Readable({ read: () => {} })

  context.body = readable
  context.set("content-type", "text/html")

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
})

app.use(router.middleware())
app.use(serve(build))

app.listen(port, () => console.log(`Listening on ${port}`))
