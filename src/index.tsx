import React from "react"
import ReactDOM from "react-dom"

const main = async () => {
  const { default: App } = await import("./App")
  console.log("imported app")
  ReactDOM.render(<App />, document.querySelector("#root"))
}

main()
