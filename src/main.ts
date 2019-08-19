import { app, BrowserWindow } from "electron"

let instance: BrowserWindow | null

function createWindow() {
  instance = new BrowserWindow()

  instance.on("closed", () => {
    instance = null
  })

  if (process.env.NODE_ENV === "production") {
    instance.loadFile("../build/index.html")
  } else {
    instance.loadURL(`http://localhost:9000/`)
  }
}

app.on("ready", createWindow)

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    Electron.app.quit()
  }
})

app.on("activate", () => {
  if (instance === null) {
    createWindow()
  }
})
