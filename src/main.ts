import { app, BrowserWindow } from "electron"

let instance: BrowserWindow | null

function createWindow() {
  instance = new BrowserWindow({
    frame: false,
    transparent: true,
    minWidth: 300,
    minHeight: 200
  })

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
  if (process.env.NODE_ENV !== "production") {
    createWindow()
  }

  if (process.platform !== "darwin") {
    app.quit()
  }
})

app.on("activate", () => {
  if (instance === null) {
    createWindow()
  }
})
