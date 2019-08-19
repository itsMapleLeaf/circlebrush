import { app, BrowserWindow, Tray, nativeImage } from "electron"

const logo = nativeImage.createFromPath("./public/logo/icon.ico")

let instance: BrowserWindow | null
let tray: Tray | null

function createWindow() {
  instance = new BrowserWindow({
    title: "Circlebrush",
    icon: logo,
    frame: false,
    minWidth: 500,
    minHeight: 400,
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
    instance.loadFile("./build/index.html")
  } else {
    instance.loadURL(`http://localhost:9000/`)
  }
}

function createTray() {
  tray = new Tray(logo)

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
