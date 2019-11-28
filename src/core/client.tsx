import React from "react"
import { hydrate, render } from "react-dom"
import ErrorBoundary from "./ErrorBoundary"

const main = async () => {
  const { default: App } = await import(/* webpackChunkName: "app" */ "./App")
  const container = document.querySelector("#app")

  const app = (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )

  if (container?.hasChildNodes()) {
    hydrate(app, container)
  } else {
    render(app, container)
  }
}

main().catch(error => {
  console.error("Error initialising app:", error)
})
