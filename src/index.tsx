import React from "react"
import ReactDOM from "react-dom"

import("./App").then(function(App) {
  ReactDOM.render(<App.default />, document.querySelector("#root"))
})
