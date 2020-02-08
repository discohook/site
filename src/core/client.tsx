import React from "react"
import { hydrate, render } from "react-dom"
import { App } from "./components/App"
import { ErrorBoundary } from "./components/ErrorBoundary"

const app = (
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
)

const container = document.querySelector("#app")
if (container?.hasChildNodes()) {
  hydrate(app, container)
} else {
  render(app, container)
}
