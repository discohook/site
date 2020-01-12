import React from "react"
import App from "./App"
import ErrorBoundary from "./ErrorBoundary"

export default function Main() {
  return (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
}
