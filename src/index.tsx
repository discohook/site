import React from "react"
import ReactDOM from "react-dom"

const main = async () => {
  const { default: App } = await import("./App" /* webpackChunkName: "app" */)
  ReactDOM.render(<App />, document.querySelector("#root"))
}

main()
