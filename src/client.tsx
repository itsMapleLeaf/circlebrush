import React from "react"
import ReactDOM from "react-dom"
import { App } from "./modules/core/components/App"
import { remote, ipcRenderer } from "electron"
import { createManager } from "./common/state/manager"
import { managerContext } from "./common/state/contexts/managerContext"
import { autorun } from "mobx"

async function init() {
  const element = document.querySelector(".app")
  const manager = createManager()

  await manager.init()

  ReactDOM.render(
    <managerContext.Provider value={manager}>
      <App />
    </managerContext.Provider>,
    element
  )

  autorun(() => {
    const serialized = manager.serialize()
    ipcRenderer.send("stores", serialized)
  })

  remote.getCurrentWindow().show()
}

init()
