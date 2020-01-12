import React from "react"
import { hydrate, render } from "react-dom"

const main = async () => {
  const { default: Main } = await import(/* webpackChunkName: "app" */ "./Main")
  const container = document.querySelector("#app")

  const app = <Main />

  if (container?.hasChildNodes()) {
    hydrate(app, container)
  } else {
    render(app, container)
  }
}

main().catch(error => {
  console.error("Error initialising app:", error)
})
