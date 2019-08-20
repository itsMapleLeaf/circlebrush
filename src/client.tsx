import React from "react"
import ReactDOM from "react-dom"
import { App } from "./modules/core/components/App"
import { remote } from "electron"

function init() {
  const element = document.querySelector(".app")
  ReactDOM.render(<App />, element)

  remote.getCurrentWindow().show()
}

init()
