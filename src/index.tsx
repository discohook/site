import React from "react"
import { hydrate, render } from "react-dom"

const main = async () => {
  const { default: App } = await import("./App" /* webpackChunkName: "app" */)
  const app = document.querySelector("#app")

  const url = new URL(location.href)

  if (app && app.hasChildNodes()) {
    hydrate(<App startUrl={url} />, app)
  } else {
    render(<App startUrl={url} />, app)
  }
}

main()
