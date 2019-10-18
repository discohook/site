import React from "react"
import { hydrate, render } from "react-dom"

const main = async () => {
  const { default: App } = await import(/* webpackChunkName: "app" */ "./App")
  const app = document.querySelector("#app")

  if (app && app.hasChildNodes()) {
    hydrate(<App />, app)
  } else {
    render(<App />, app)
  }
}

main().catch(error => {
  console.error("Error initializing app:", error)
})
