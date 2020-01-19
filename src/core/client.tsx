import React from "react"
import { hydrate, render } from "react-dom"
import App from "./App"

const app = <App />

const container = document.querySelector("#app")
if (container?.hasChildNodes()) {
  hydrate(app, container)
} else {
  render(app, container)
}
