import { app, BrowserWindow, Tray, Menu, nativeImage } from "electron"

let instance: BrowserWindow | null
let tray: Tray | null

function createWindow() {
  instance = new BrowserWindow({
    frame: false,
    minWidth: 300,
    minHeight: 200,
    webPreferences: {
      nodeIntegration: true
    }
  })

  instance.on("close", event => {
    event.preventDefault()
    instance!.hide()
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

function createTray() {
  tray = new Tray(nativeImage.createEmpty())

  tray.on("click", () => {
    instance!.show()
  })
}

app.on("window-all-closed", () => {
  if (process.env.NODE_ENV !== "production") {
    return createWindow()
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

app.on("ready", () => {
  createWindow()
  createTray()
})
