import React from "react"
import ReactDOM from "react-dom"

const main = async () => {
  const { default: App } = await import("./App")
  ReactDOM.render(<App />, document.querySelector("#root"))
}

main()
